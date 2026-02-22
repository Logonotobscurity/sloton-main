/**
 * Common types used across the analytics system
 */

/**
 * Request context for enrichment
 */
export interface RequestContext {
  ipAddress: string;
  userAgent: string;
  headers: Record<string, string>;
}

/**
 * Collector configuration
 */
export interface CollectorConfig {
  apiEndpoint: string;
  apiKey: string;
  batchSize: number;
  flushInterval: number; // milliseconds
  enableAutoPageTracking: boolean;
}

/**
 * Ingest request
 */
export interface IngestRequest {
  events: any[]; // RawEvent[]
  sessionId: string;
  userId?: string;
  clientTimestamp: string;
}

/**
 * Ingest response
 */
export interface IngestResponse {
  accepted: number;
  rejected: number;
  errors?: Array<{ eventId: string; errors: any[] }>;
}

/**
 * Retention policy
 */
export interface RetentionPolicy {
  eventRetentionDays: number;
  profileRetentionDays: number;
  journeyRetentionDays: number;
  anonymizeAfterDays: number;
}

/**
 * Deletion reason
 */
export enum DeletionReason {
  UserRequest = 'user_request',
  GDPR = 'gdpr',
  Retention = 'retention',
  Admin = 'admin'
}

/**
 * Deletion report
 */
export interface DeletionReport {
  userId: string;
  eventsDeleted: number;
  profilesDeleted: number;
  journeysDeleted: number;
  timestamp: Date;
}

/**
 * Anonymization report
 */
export interface AnonymizationReport {
  userId: string;
  eventsAnonymized: number;
  profilesAnonymized: number;
  journeysAnonymized: number;
  timestamp: Date;
}

/**
 * User data export
 */
export interface UserDataExport {
  userId: string;
  profile: any; // UserProfile
  events: any[]; // Event[]
  journeys: any[]; // UserJourney[]
  exportedAt: Date;
}

/**
 * API error response
 */
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Export format
 */
export enum ExportFormat {
  CSV = 'csv',
  JSON = 'json'
}

/**
 * Health check status
 */
export interface HealthCheckStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  checks: {
    database: boolean;
    eventBus: boolean;
    cache: boolean;
  };
  message?: string;
}
