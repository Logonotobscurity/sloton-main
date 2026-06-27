
/**
 * @fileoverview Sample Ingestion API Server (Node.js/Express).
 * This service is the single entry point for all incoming lead events.
 */
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Ajv, { type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

// NOTE: This is a mock implementation for demonstration purposes
// In production, replace with actual message bus implementation
const producer = {
  connect: async () => {},
  send: async (message: any) => {
    // TODO: Replace with actual message bus producer (Kafka, SQS, etc.)
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Producing to Event Bus:', JSON.stringify(message, null, 2));
    }
  }
};

import leadEventSchema from '@/data-pipeline/lead-event.schema.json';

const app = express();
app.use(express.json());

const ajv = new Ajv();
addFormats(ajv as any);
const validate: ValidateFunction = ajv.compile(leadEventSchema);

const PORT = process.env.PORT || 3000;

// Middleware for API Key authentication
const apiKeyAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {    
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.INGESTION_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.post('/ingest', apiKeyAuth, async (req, res) => {
    try {
        const eventPayload = req.body;

        // 1. Assign metadata
        const event = {
            ...eventPayload,
            event_id: uuidv4(),
            received_at: new Date().toISOString(),
            user_ip: req.ip,
            user_agent: req.headers['user-agent'],
        };
        
        // 2. Validate against JSON Schema
        const isValid = validate(event);
        if (!isValid) {
            // Log validation errors in development
            if (process.env.NODE_ENV === 'development') {
                console.error('[DEV] Invalid event payload:', validate.errors);
            }
            return res.status(400).json({ error: 'Invalid payload', details: validate.errors });
        }

        // 3. Generate Idempotency Key if not provided
        if (!event.idempotency_key) {
            const { email, phone, submission_type } = event.payload;
            const keyData = `${event.tenant_id || ''}-${email}-${phone || ''}-${submission_type}`;
            event.idempotency_key = crypto.createHash('sha256').update(keyData).digest('hex');
        }

        // 4. (Optional) Persist raw event to cold storage (e.g., S3) asynchronously
        // await saveToS3(event);

        // 5. Produce event to the message bus
        await producer.send({
            topic: 'lead.ingest',
            messages: [{ value: JSON.stringify(event) }],
        });

        // 6. Respond immediately to the client
        return res.status(202).json({
            message: 'Event accepted',
            event_id: event.event_id,
            idempotency_key: event.idempotency_key,
        });

    } catch (error: unknown) {
        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('[DEV] Ingestion error:', error);
        }
        // In production, use structured logger
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const startServer = async () => {
    await producer.connect();
    app.listen(PORT, () => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEV] Ingestion API listening on port ${PORT}`);
        }
    });
};

startServer();
