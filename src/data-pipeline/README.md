
# Central Data Pipeline: Architecture & Runbook

This document outlines the design, architecture, and operational procedures for the event-driven central data pipeline.

## 1. High-Level Architecture

The pipeline is designed to be a modular, scalable, and resilient system for ingesting, processing, and routing lead data from various sources to multiple destinations in real-time.

### Data Flow

1.  **Sources**: Client-side forms, chatbots, third-party webhooks, etc., send data to the Ingestion API.
2.  **Ingestion API**: A lightweight, secure endpoint that validates, timestamps, and accepts incoming events, then places them onto a durable message bus.
3.  **Event Bus (Message Queue)**: A central, durable queue (e.g., Kafka, AWS SQS) that buffers events for processing.
4.  **Stream Processors (Consumers)**: A series of microservices that consume events from the bus to perform validation, normalization, enrichment, and deduplication.
5.  **Sinks**: Processed data is routed to various destinations:
    *   **Primary Database (Postgres)**: For persistent, authoritative storage.
    *   **Search Index (Elasticsearch)**: For fast, complex queries.
    *   **Analytics Warehouse**: For business intelligence and reporting.
    *   **Downstream Connectors**: For real-time integration with CRMs, marketing platforms, and the AI Automation Assistant.
6.  **Dead Letter Queue (DLQ)**: Failed events are sent to a DLQ for manual inspection and replay.

### Sequence Diagram

```mermaid
sequenceDiagram
    participant Client as Client App/Webhook
    participant IngestAPI as Ingestion API
    participant EventBus as Event Bus (e.g., Kafka)
    participant Processor as Validator/Enricher
    participant Deduplicator as Deduplication Service
    participant Postgres as PostgreSQL DB
    participant Elasticsearch as Search Index
    participant Connectors as Downstream Connectors

    Client->>+IngestAPI: POST /ingest (payload)
    IngestAPI-->>Client: 202 Accepted
    IngestAPI->>EventBus: Produce(lead.ingest)
    -IngestAPI;

    Processor->>EventBus: Consume(lead.ingest)
    Processor-->>Processor: Validate, Normalize, Enrich
    Processor->>EventBus: Produce(lead.normalized)

    Deduplicator->>EventBus: Consume(lead.normalized)
    Deduplicator-->>Deduplicator: Check idempotency_key in Redis/DB
    alt Key is new
        Deduplicator->>+Postgres: INSERT lead
        Postgres-->>-Deduplicator: Success
        Deduplicator->>+Elasticsearch: INDEX document
        Elasticsearch-->>-Deduplicator: Success
        Deduplicator->>EventBus: Produce(lead.captured)
    else Key exists
        Deduplicator-->>Deduplicator: Discard or route to update flow
    end

    Connectors->>EventBus: Consume(lead.captured)
    Connectors-->>Connectors: Route to CRM, AI Assistant, etc.
```

## 2. Data Schemas

### 2.1. LeadEvent JSON Schema

All incoming data is validated against the `lead-event.schema.json` file. This ensures data quality at the entry point of the pipeline.

### 2.2. PostgreSQL Schema

The primary `leads` table serves as the authoritative source of truth.

```sql
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    idempotency_key VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(50) NOT NULL,
    received_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Core Payload
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    submission_type VARCHAR(100),
    consent BOOLEAN DEFAULT FALSE,
    
    -- Enriched Data
    ip_address INET,
    user_agent TEXT,
    geo_country VARCHAR(100),
    geo_city VARCHAR(100),

    -- UTM / Campaign Data
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    utm_term VARCHAR(255),

    -- Raw metadata
    metadata JSONB
);

-- Indexes for fast lookups
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_received_at ON leads(received_at);
CREATE INDEX idx_leads_source ON leads(source);
```

### 2.3. Elasticsearch Mapping

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "event_id": { "type": "keyword" },
      "received_at": { "type": "date" },
      "source": { "type": "keyword" },
      "first_name": { "type": "text" },
      "last_name": { "type": "text" },
      "email": { "type": "keyword" },
      "phone": { "type": "keyword" },
      "message": { "type": "text" },
      "submission_type": { "type": "keyword" },
      "geo_country": { "type": "keyword" },
      "geo_city": { "type": "keyword" },
      "utm_campaign": { "type": "keyword" }
    }
  }
}
```

## 3. Node.js/TypeScript Code Snippets

Sample code for the core pipeline services can be found in:
*   `src/data-pipeline/server.ts`
*   `src/data-pipeline/consumer.ts`
*   `src/data-pipeline/connectors.ts`

## 4. Security & Compliance

*   **Authentication**: The Ingestion API must be protected. Use API Keys for simple webhooks and JWT/OAuth for client-side/mobile submissions.
*   **Encryption**: All data must be encrypted in transit (TLS 1.2+) and at rest (disk-level encryption for databases, queues, and storage).
*   **PII & Consent**:
    *   Do not process events where `consent` is `false`.
    *   Implement PII redaction or tokenization for sensitive fields if required by compliance.
    *   Implement data retention policies and a mechanism for data deletion to comply with GDPR "Right to be Forgotten".

## 5. Monitoring & Observability

*   **Metrics (Prometheus)**:
    *   `ingest_api_events_total`: Counter for events received, partitioned by source and status (valid/invalid).
    *   `ingest_api_latency_seconds`: Histogram of API response times.
    *   `consumer_events_processed_total`: Counter for events processed by consumers.
    *   `dlq_events_total`: Counter for events sent to the Dead Letter Queue.
*   **Logging (ELK/CloudWatch)**: Structured JSON logs for all services. Log `event_id` and `tenant_id` for traceability.
*   **Tracing (OpenTelemetry)**: Implement distributed tracing to follow an event across all microservices, from ingestion to sink.

## 6. Deployment (Docker & Kubernetes)

Each microservice (Ingestion API, Consumers, Connectors) should be containerized.

### Sample Dockerfile
```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY dist/ .

EXPOSE 3000
CMD [ "node", "server.js" ]
```

### Sample Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ingestion-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ingestion-api
  template:
    metadata:
      labels:
        app: ingestion-api
    spec:
      containers:
      - name: ingestion-api
        image: your-repo/ingestion-api:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
```

## 7. Go-Live Runbook (Concise)

1.  **Provision Infrastructure**:
    *   Set up PostgreSQL database and Elasticsearch cluster.
    *   Set up Kafka (or SQS/SNS) topics: `lead.ingest`, `lead.normalized`, `lead.captured`, `lead.dlq`.
    *   Set up Redis for deduplication checks.
    *   Set up S3 buckets for raw event logging and the DLQ.

2.  **Deploy Services**:
    *   Build Docker images for each microservice.
    *   Deploy services to Kubernetes (or other container orchestrator).
    *   Configure environment variables: database connection strings, queue URLs, API keys for external services.

3.  **Configure API Gateway**:
    *   Set up an API Gateway to expose the Ingestion API service.
    *   Implement rate limiting and API key validation at the gateway level.

4.  **Initial Data Seeding/Testing**:
    *   Send test events from all sources to the `/ingest` endpoint.
    *   Verify events flow through the entire pipeline: check Postgres, Elasticsearch, and mock CRM/AI endpoints.
    *   Test failure scenarios: send invalid data, malformed JSON, and verify events land in the DLQ.

5.  **Monitoring Setup**:
    *   Configure Prometheus to scrape metrics from all services.
    *   Set up Grafana dashboards to visualize key metrics (latency, event volume, error rates).
    *   Set up alerts in Alertmanager for critical conditions (e.g., high DLQ rate, high API latency).

6.  **Go-Live**:
    *   Update DNS to point production traffic to the new pipeline.
    *   Monitor dashboards closely during the initial hours of a full traffic load.
