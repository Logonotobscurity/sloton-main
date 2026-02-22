# User Data Capture & Analytics System

A comprehensive, event-driven system for capturing, analyzing, and deriving insights from user interactions across the LOG_ON platform.

## Overview

This system provides:
- **Event Capture**: Track user interactions from forms, chatbot, AI tools, and page views
- **User Profiling**: Build rich user profiles with engagement scores and interests
- **Journey Tracking**: Analyze user paths through the platform
- **Analytics**: Generate insights on active users, conversions, and trends
- **Privacy Compliance**: GDPR-compliant data handling with consent management

## Architecture

The system follows an event-driven architecture with these layers:

1. **Capture Layer** (`sdk/`): Client-side SDK for event collection
2. **Ingestion Layer** (`ingestion/`): API for receiving and validating events
3. **Processing Layer** (`processors/`): Stream processors for profiles, journeys, and analytics
4. **Storage Layer** (`repositories/`): Database access for PostgreSQL and Elasticsearch
5. **Query Layer** (`api/`): REST API and WebSocket for data access
6. **Compliance Layer** (`compliance/`): Consent management and data retention

## Directory Structure

```
src/analytics/
├── types/              # TypeScript type definitions
├── sdk/                # Client-side Event Collector SDK
├── ingestion/          # Ingestion API and enrichment
├── processors/         # Profile Builder, Journey Tracker, Analytics Engine
├── repositories/       # Database access layer
├── api/                # Query API endpoints
├── compliance/         # Consent Manager, Data Retention Service
├── utils/              # Shared utilities
├── config/             # Configuration management
└── __tests__/          # Test files
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Elasticsearch 8+
- Kafka (or existing Data Pipeline)
- Redis (for caching)

### Environment Variables

Create a `.env.local` file with:

```env
# Analytics System
ANALYTICS_API_KEY=your-api-key
ANALYTICS_API_ENDPOINT=http://localhost:3000/api/events/ingest

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/analytics
ELASTICSEARCH_URL=http://localhost:9200

# Event Bus
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=analytics-system

# Redis Cache
REDIS_URL=redis://localhost:6379

# IP Geolocation (optional)
IPGEOLOCATION_API_KEY=your-api-key
```

### Installation

```bash
# Install dependencies (including fast-check for property-based testing)
npm install fast-check --save-dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Usage

### Client-Side Event Tracking

```typescript
import { EventCollectorSDK } from '@/analytics/sdk';

// Initialize the SDK
const analytics = new EventCollectorSDK();
analytics.init({
  apiEndpoint: process.env.NEXT_PUBLIC_ANALYTICS_API_ENDPOINT!,
  apiKey: process.env.NEXT_PUBLIC_ANALYTICS_API_KEY!,
  batchSize: 10,
  flushInterval: 5000,
  enableAutoPageTracking: true
});

// Track a form submission
analytics.trackFormSubmission({
  formType: 'contact',
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'Hello!'
});

// Track AI tool usage
analytics.trackAIToolUsage({
  toolName: 'task_automation',
  input: { workflowDescription: 'Automate onboarding' },
  output: { steps: [...] }
});

// Identify a user
analytics.identify('user-123', {
  name: 'John Doe',
  email: 'john@example.com',
  industry: 'Technology'
});
```

### Server-Side Analytics Queries

```typescript
import { AnalyticsEngine } from '@/analytics/processors/analytics-engine';

const engine = new AnalyticsEngine();

// Get active users
const activeUsers = await engine.calculateActiveUsers({
  type: 'day',
  value: '2024-01-15'
});

// Get conversion rates
const conversionRates = await engine.calculateConversionRates('contact_form');

// Generate weekly report
const report = await engine.generateWeeklyReport();
```

## Testing

The system uses a dual testing approach:

### Unit Tests
Test specific examples and edge cases:
```bash
npm test -- src/analytics/__tests__/unit
```

### Property-Based Tests
Test universal properties across all inputs:
```bash
npm test -- src/analytics/__tests__/properties
```

All property tests run with 100+ iterations to ensure correctness.

## Documentation

- [Requirements](./.kiro/specs/user-data-capture-analytics/requirements.md)
- [Design](./.kiro/specs/user-data-capture-analytics/design.md)
- [Implementation Tasks](./.kiro/specs/user-data-capture-analytics/tasks.md)

## Privacy & Compliance

The system is GDPR-compliant with:
- Consent management before data capture
- IP address anonymization
- Data access API (right of access)
- Data deletion API (right to be forgotten)
- Automatic data retention policies
- PII access audit logging

## Performance

The system is designed to handle:
- 1000+ events per second
- API response times < 200ms (95th percentile)
- Horizontal scaling via multiple processing nodes
- Event buffering during high load

## Monitoring

Prometheus metrics are exposed at `/metrics`:
- `analytics_events_processed_total`
- `analytics_api_latency_seconds`
- `analytics_db_query_duration_seconds`

Health checks available at `/health`.

## Contributing

When adding new features:
1. Update type definitions in `types/`
2. Write unit tests and property tests
3. Update this README
4. Follow the existing code structure

## License

Internal use only - LOG_ON Platform
