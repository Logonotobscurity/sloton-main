
/**
 * @fileoverview Sample connectors for downstream systems.
 * These services subscribe to the `lead.captured` topic and forward data to external systems.
 */

import fetch from 'node-fetch'; // Using node-fetch for example

// Mock consumer for `lead.captured` topic
const consumer = {
    run: async ({ eachMessage }: { eachMessage: (message: any) => Promise<void> }) => {
        // This would be replaced by a real Kafka/SQS consumer loop
        setInterval(() => {
            const message = {
                topic: 'lead.captured',
                message: {
                    value: JSON.stringify({
                        event_id: 'mock-event-id',
                        payload: {
                            first_name: 'Jane',
                            last_name: 'Doe',
                            email: 'jane.doe@example.com',
                            submission_type: 'newsletter-signup',
                        },
                    }),
                },
            };
            eachMessage(message);
        }, 7000);
    },
};

// --- AI Assistant Connector ---
const AI_ASSISTANT_ENDPOINT = 'https://api.example.com/ai/ingest';
const AI_ASSISTANT_API_KEY = process.env.AI_ASSISTANT_API_KEY;

async function sendToAIAssistant(event: any) {
    try {
        console.log(`Sending event ${event.event_id} to AI Assistant...`);
        const response = await fetch(AI_ASSISTANT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_ASSISTANT_API_KEY}`,
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            throw new Error(`AI Assistant API returned status: ${response.status}`);
        }
        console.log(`Successfully sent event ${event.event_id} to AI Assistant.`);
    } catch (error) {
        console.error('Error sending to AI Assistant:', error);
        // This error should be handled with a retry mechanism before going to a DLQ.
        throw error;
    }
}

// --- CRM Connector (e.g., Salesforce) ---
async function sendToCRM(event: any) {
    // Placeholder for CRM integration logic
    console.log(`Syncing lead ${event.payload.email} to CRM...`);
    // Example: await salesforceClient.upsertLead(event.payload);
    console.log('Successfully synced lead to CRM.');
}


// Main consumer loop
const main = async () => {
    await consumer.run({
        eachMessage: async ({ message }: any) => {
            const event = JSON.parse(message.value.toString());
            
            // Run connectors in parallel
            try {
                await Promise.all([
                    sendToAIAssistant(event),
                    sendToCRM(event),
                ]);
            } catch (err) {
                 console.error(`Failed to process connectors for event ${event.event_id}. This would trigger DLQ logic.`, err);
            }
        },
    });
};

main().catch(console.error);
