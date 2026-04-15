/**
 * Data Pipeline Type Definitions
 * Replaces 'any' types in data pipeline components
 */

/**
 * Lead Event Source Types
 */
export type LeadEventSource = 
  | 'web_form'
  | 'chatbot'
  | 'api'
  | 'email'
  | 'phone'
  | 'social_media';

/**
 * Lead Event Status
 */
export type LeadEventStatus = 
  | 'received'
  | 'processing'
  | 'enriched'
  | 'qualified'
  | 'converted'
  | 'failed';

/**
 * Lead Event Payload
 */
export interface LeadEventPayload {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  message?: string;
  submission_type?: string;
  [key: string]: unknown;
}

/**
 * Normalized Lead Event
 */
export interface NormalizedLeadEvent {
  event_id: string;
  idempotency_key: string;
  source: LeadEventSource;
  received_at: string;
  payload: LeadEventPayload;
  enriched_data?: Record<string, unknown>;
  status?: LeadEventStatus;
  metadata?: Record<string, unknown>;
}

/**
 * Kafka Message Structure
 */
export interface KafkaMessage {
  topic: string;
  partition: number;
  message: {
    value: string;
    key?: string;
    headers?: Record<string, string>;
  };
}

/**
 * Database Query Result
 */
export interface DatabaseQueryResult {
  rowCount: number;
  rows?: unknown[];
  error?: Error;
}

/**
 * Search Index Parameters
 */
export interface SearchIndexParams {
  index: string;
  id: string;
  body: Record<string, unknown>;
}

/**
 * Event Bus Message
 */
export interface EventBusMessage {
  topic: string;
  messages: Array<{
    key?: string;
    value: string;
    headers?: Record<string, string>;
  }>;
}

/**
 * Connector Response
 */
export interface ConnectorResponse {
  success: boolean;
  message?: string;
  error?: Error;
  data?: unknown;
}
