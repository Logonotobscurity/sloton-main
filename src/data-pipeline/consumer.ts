
/**
 * @fileoverview Sample consumer for processing normalized lead events.
 * This service handles deduplication and writes to persistent stores.
 */

import type { 
  NormalizedLeadEvent, 
  KafkaMessage, 
  DatabaseQueryResult,
  SearchIndexParams 
} from '@/types/data-pipeline';

// Mock database/search clients and message bus consumer
const dbClient = {
    query: async (query: string, params: unknown[]): Promise<DatabaseQueryResult> => {
        // Simulate unique constraint violation
        if (Math.random() < 0.1) throw new Error('duplicate key value violates unique constraint');
        return { rowCount: 1 };
    },
};

const searchClient = {
    index: async (params: SearchIndexParams): Promise<void> => {
        // Elasticsearch indexing simulation
        return Promise.resolve();
    },
};

const consumer = {
    run: async ({ eachMessage }: { eachMessage: (message: KafkaMessage) => Promise<void> }) => {
        // This would be replaced by a real Kafka/SQS consumer loop
        setInterval(() => {
            // Simulate receiving a message
             const message: KafkaMessage = {
                topic: 'lead.normalized',
                partition: 0,
                message: {
                    value: JSON.stringify({
                        event_id: 'mock-event-id',
                        idempotency_key: 'mock-idempotency-key',
                        source: 'web_form',
                        received_at: new Date().toISOString(),
                        payload: { email: 'test@example.com', submission_type: 'contact-us' },
                        // ... other normalized fields
                    }),
                },
            };
            eachMessage(message);
        }, 5000);
    },
};

const producer = { 
    send: async (message: unknown): Promise<void> => {
        return Promise.resolve();
    } 
};

async function processLeadEvent(event: NormalizedLeadEvent): Promise<void> {
    const { idempotency_key, event_id, source, received_at, payload, ...enriched } = event;

    try {
        // Deduplication Step: Insert into Postgres with unique idempotency_key
        const query = `
            INSERT INTO leads (event_id, idempotency_key, source, received_at, email, submission_type, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const params = [event_id, idempotency_key, source, received_at, payload.email, payload.submission_type, JSON.stringify(event)];
        
        await dbClient.query(query, params);

        console.log(`Successfully inserted lead with event_id: ${event_id}`);

        // If insert is successful, proceed to index and produce `lead.captured` event
        await searchClient.index({
            index: 'leads',
            id: event_id,
            body: { ...payload, ...enriched, received_at },
        });

        await producer.send({
            topic: 'lead.captured',
            messages: [{ value: JSON.stringify(event) }],
        });

    } catch (error) {
        if (error instanceof Error && error.message.includes('duplicate key')) {
            console.warn(`Duplicate event detected. Idempotency key: ${idempotency_key}`);
            // Event is acknowledged without error, stopping the processing flow for this duplicate.
        } else {
            console.error('Failed to process lead event:', error);
            throw error; // Re-throw to trigger retry/DLQ mechanism in the consumer
        }
    }
}


const main = async (): Promise<void> => {
    await consumer.run({
        eachMessage: async (kafkaMsg: KafkaMessage): Promise<void> => {
            try {
                const event = JSON.parse(kafkaMsg.message.value.toString()) as NormalizedLeadEvent;
                await processLeadEvent(event);
            } catch (err) {
                console.error("Error processing message, will be retried or sent to DLQ.", err);
                // The real consumer would handle retries and DLQ logic here.
            }
        },
    });
};

main().catch(console.error);
