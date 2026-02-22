/**
 * Analytics system configuration
 * 
 * Centralized configuration for the User Data Capture & Analytics System
 */

export interface AnalyticsConfig {
  // API Configuration
  api: {
    endpoint: string;
    apiKey: string;
    rateLimit: {
      maxRequestsPerMinute: number;
      maxRequestsPerHour: number;
    };
  };

  // Event Collector Configuration
  collector: {
    batchSize: number;
    flushInterval: number; // milliseconds
    maxBufferSize: number;
    enableAutoPageTracking: boolean;
    retryAttempts: number;
    retryBackoffMs: number;
  };

  // Database Configuration
  database: {
    url: string;
    poolSize: number;
    connectionTimeout: number;
  };

  // Elasticsearch Configuration
  elasticsearch: {
    url: string;
    indexPrefix: string;
  };

  // Event Bus Configuration
  eventBus: {
    brokers: string[];
    clientId: string;
    topics: {
      ingest: string;
      normalized: string;
      captured: string;
      dlq: string;
    };
  };

  // Redis Configuration
  cache: {
    url: string;
    ttl: number; // seconds
    keyPrefix: string;
  };

  // Privacy & Compliance
  privacy: {
    anonymizeIp: boolean;
    retentionPolicy: {
      eventRetentionDays: number;
      profileRetentionDays: number;
      journeyRetentionDays: number;
      anonymizeAfterDays: number;
    };
  };

  // External Services
  services: {
    ipGeolocation?: {
      apiKey: string;
      provider: 'ipapi' | 'ipgeolocation' | 'maxmind';
    };
  };

  // Feature Flags
  features: {
    enableRealTimeMetrics: boolean;
    enableJourneyPatternDetection: boolean;
    enableLeadScoring: boolean;
    enableAtRiskDetection: boolean;
  };
}

/**
 * Default configuration
 */
export const defaultConfig: AnalyticsConfig = {
  api: {
    endpoint: process.env.ANALYTICS_API_ENDPOINT || 'http://localhost:3000/api/events/ingest',
    apiKey: process.env.ANALYTICS_API_KEY || '',
    rateLimit: {
      maxRequestsPerMinute: 100,
      maxRequestsPerHour: 5000,
    },
  },

  collector: {
    batchSize: 10,
    flushInterval: 5000,
    maxBufferSize: 100,
    enableAutoPageTracking: true,
    retryAttempts: 3,
    retryBackoffMs: 1000,
  },

  database: {
    url: process.env.DATABASE_URL || '',
    poolSize: 20,
    connectionTimeout: 30000,
  },

  elasticsearch: {
    url: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    indexPrefix: 'analytics',
  },

  eventBus: {
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    clientId: process.env.KAFKA_CLIENT_ID || 'analytics-system',
    topics: {
      ingest: 'lead.ingest',
      normalized: 'lead.normalized',
      captured: 'lead.captured',
      dlq: 'lead.dlq',
    },
  },

  cache: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: 3600,
    keyPrefix: 'analytics:',
  },

  privacy: {
    anonymizeIp: true,
    retentionPolicy: {
      eventRetentionDays: 365,
      profileRetentionDays: 730,
      journeyRetentionDays: 180,
      anonymizeAfterDays: 1095, // 3 years
    },
  },

  services: {
    ipGeolocation: process.env.IPGEOLOCATION_API_KEY
      ? {
          apiKey: process.env.IPGEOLOCATION_API_KEY,
          provider: 'ipgeolocation',
        }
      : undefined,
  },

  features: {
    enableRealTimeMetrics: true,
    enableJourneyPatternDetection: true,
    enableLeadScoring: true,
    enableAtRiskDetection: true,
  },
};

/**
 * Get analytics configuration
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  return defaultConfig;
}

/**
 * Validate configuration
 */
export function validateConfig(config: AnalyticsConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.api.apiKey) {
    errors.push('API key is required');
  }

  if (!config.database.url) {
    errors.push('Database URL is required');
  }

  if (config.collector.batchSize < 1) {
    errors.push('Batch size must be at least 1');
  }

  if (config.collector.flushInterval < 1000) {
    errors.push('Flush interval must be at least 1000ms');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
