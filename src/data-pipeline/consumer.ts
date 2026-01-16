
/**
 * @fileoverview Sample consumer for processing normalized lead events.
 * This service handles deduplication and writes to persistent stores.
 */

// Mock database/search clients and message bus consumer
const dbClient = {
    query: async (query: string, params: any[]) => {
        console.log('PG Query:', query, params);
        // Simulate unique constraint violation
        if (Math.random() < 0.1) throw new Error('duplicate key value violates unique constraint');
        return { rowCount: 1 };
    },
};

const searchClient = {
    index: async (params: any) => console.log('Elasticsearch Index:', params),
};

const consumer = {
    run: async ({ eachMessage }: { eachMessage: (message: any) => Promise<void> }) => {
        // This would be replaced by a real Kafka/SQS consumer loop
        setInterval(() => {
            // Simulate receiving a message
             const message = {
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

const producer = { send: async (message: any) => console.log('Producing to Event Bus:', message) };

async function processLeadEvent(event: any) {
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

    } catch (error: any) {
        if (error.message.includes('duplicate key')) {
            console.warn(`Duplicate event detected. Idempotency key: ${idempotency_key}`);
            // Event is acknowledged without error, stopping the processing flow for this duplicate.
        } else {
            console.error('Failed to process lead event:', error);
            throw error; // Re-throw to trigger retry/DLQ mechanism in the consumer
        }
    }
}


const main = async () => {
    await consumer.run({
        eachMessage: async ({ message }: any) => {
            try {
                const event = JSON.parse(message.value.toString());
                await processLeadEvent(event);
            } catch (err) {
                console.error("Error processing message, will be retried or sent to DLQ.", err);
                // The real consumer would handle retries and DLQ logic here.
            }
        },
    });
};

main().catch(console.error);
