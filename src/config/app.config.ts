/**
 * Application Configuration
 * Centralized configuration management for the application
 */

export interface AppConfig {
  // Environment
  environment: string;
  isDevelopment: boolean;
  isProduction: boolean;
  
  // URLs and Domains
  baseUrl: string;
  apiUrl: string;
  
  // Security
  security: {
    rateLimitWindow: number; // milliseconds
    rateLimitMaxRequests: number;
    jwtExpiry: string;
    jwtRefreshExpiry: string;
    csrfCookieName: string;
    csrfHeaderName: string;
  };
  
  // Logging
  logging: {
    maxQueueSize: number;
    flushInterval: number; // milliseconds
    endpoint: string;
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  
  // External Services
  services: {
    resend: {
      apiKey?: string;
      fromEmail: string;
      toEmail: string;
      enabled: boolean;
    };
    whatsapp: {
      link: string;
    };
    analytics: {
      matomoUrl: string;
      siteId: number;
      googleTagManagerId?: string;
    };
  };
  
  // UI Configuration
  ui: {
    toastLimit: number;
    toastRemoveDelay: number;
    carouselDelay: number;
    animationDelayStep: number;
  };
  
  // Cache Configuration
  cache: {
    staticCacheName: string;
    runtimeCacheName: string;
    precacheUrls: string[];
  };
  
  // AI Configuration
  ai: {
    provider: string;
    fallbackProvider?: string;
    timeout: number;
    retryAttempts: number;
    enableCircuitBreaker: boolean;
    circuitBreakerThreshold: number;
    circuitBreakerTimeout: number;
    enableLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
}

// Default configuration
export const defaultAppConfig: AppConfig = {
  environment: 'development',
  isDevelopment: true,
  isProduction: false,
  
  baseUrl: 'https://logonsolutions.netlify.app',
  apiUrl: 'https://api.logonsolutions.netlify.app',
  
  security: {
    rateLimitWindow: 60 * 1000, // 1 minute
    rateLimitMaxRequests: 60,
    jwtExpiry: '1h',
    jwtRefreshExpiry: '7d',
    csrfCookieName: 'XSRF-TOKEN',
    csrfHeaderName: 'X-XSRF-TOKEN',
  },
  
  logging: {
    maxQueueSize: 100,
    flushInterval: 30000, // 30 seconds
    endpoint: '/api/logs',
    enabled: true,
    level: 'info',
  },
  
  services: {
    resend: {
      apiKey: process.env.RESEND_API_KEY,
      fromEmail: 'Logon Solutions <noreply@logonsolutions.com>',
      toEmail: 'logonthepage@gmail.com',
      enabled: !!process.env.RESEND_API_KEY,
    },
    whatsapp: {
      link: 'https://wa.me/qr/QFSBRGKZGHP3F1',
    },
    analytics: {
      matomoUrl: 'https://logonsolutionsnetlifyapp.matomo.cloud/',
      siteId: 1,
      googleTagManagerId: 'GTM-XXXXXXX', // Replace with actual GTM ID
    },
  },
  
  ui: {
    toastLimit: 1,
    toastRemoveDelay: 1000000,
    carouselDelay: 5000,
    animationDelayStep: 0.1,
  },
  
  cache: {
    staticCacheName: 'logon-cache-v1',
    runtimeCacheName: 'runtime-cache',
    precacheUrls: [
      '/',
      '/offline',
      '/manifest.json',
      '/favicon.ico',
      '/herosection.webp',
      '/chat-icon.webp',
      '/transperent-background.webp'
    ],
  },
  
  ai: {
    provider: 'google-ai',
    fallbackProvider: 'mock',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    enableCircuitBreaker: true,
    circuitBreakerThreshold: 5,
    circuitBreakerTimeout: 60000, // 1 minute
    enableLogging: true,
    logLevel: 'info',
  },
};

/**
 * Load configuration from environment variables
 */
export function getAppConfigFromEnvironment(): Partial<AppConfig> {
  const config: Partial<AppConfig> = {};
  
  // Environment
  if (process.env.NODE_ENV) {
    config.environment = process.env.NODE_ENV;
    config.isDevelopment = process.env.NODE_ENV === 'development';
    config.isProduction = process.env.NODE_ENV === 'production';
  }
  
  // URLs
  if (process.env.BASE_URL) config.baseUrl = process.env.BASE_URL;
  if (process.env.API_URL) config.apiUrl = process.env.API_URL;
  
  // Security
  if (process.env.RATE_LIMIT_WINDOW) {
    config.security = {
      ...config.security,
      rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW),
    };
  }
  if (process.env.RATE_LIMIT_MAX_REQUESTS) {
    config.security = {
      ...config.security,
      rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
    };
  }
  if (process.env.JWT_EXPIRY) {
    config.security = {
      ...config.security,
      jwtExpiry: process.env.JWT_EXPIRY,
    };
  }
  if (process.env.JWT_REFRESH_EXPIRY) {
    config.security = {
      ...config.security,
      jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY,
    };
  }
  
  // Logging
  if (process.env.LOG_MAX_QUEUE_SIZE) {
    config.logging = {
      ...config.logging,
      maxQueueSize: parseInt(process.env.LOG_MAX_QUEUE_SIZE),
    };
  }
  if (process.env.LOG_FLUSH_INTERVAL) {
    config.logging = {
      ...config.logging,
      flushInterval: parseInt(process.env.LOG_FLUSH_INTERVAL),
    };
  }
  if (process.env.LOG_ENDPOINT) {
    config.logging = {
      ...config.logging,
      endpoint: process.env.LOG_ENDPOINT,
    };
  }
  if (process.env.LOGGING_ENABLED) {
    config.logging = {
      ...config.logging,
      enabled: process.env.LOGGING_ENABLED === 'true',
    };
  }
  if (process.env.LOG_LEVEL) {
    const validLogLevels: Array<AppConfig['logging']['level']> = ['debug', 'info', 'warn', 'error'];
    const logLevel = process.env.LOG_LEVEL as AppConfig['logging']['level'];
    if (validLogLevels.includes(logLevel)) {
      config.logging = {
        ...config.logging,
        level: logLevel,
      };
    }
  }
  
  // Services
  if (process.env.RESEND_FROM_EMAIL) {
    config.services = {
      ...config.services,
      resend: {
        ...config.services?.resend,
        fromEmail: process.env.RESEND_FROM_EMAIL,
      },
    };
  }
  if (process.env.TO_EMAIL) {
    config.services = {
      ...config.services,
      resend: {
        ...config.services?.resend,
        toEmail: process.env.TO_EMAIL,
      },
    };
  }
  if (process.env.WHATSAPP_LINK) {
    config.services = {
      ...config.services,
      whatsapp: {
        ...config.services?.whatsapp,
        link: process.env.WHATSAPP_LINK,
      },
    };
  }
  if (process.env.MATOMO_URL) {
    config.services = {
      ...config.services,
      analytics: {
        ...config.services?.analytics,
        matomoUrl: process.env.MATOMO_URL,
      },
    };
  }
  if (process.env.MATOMO_SITE_ID) {
    config.services = {
      ...config.services,
      analytics: {
        ...config.services?.analytics,
        siteId: parseInt(process.env.MATOMO_SITE_ID),
      },
    };
  }
  if (process.env.GOOGLE_TAG_MANAGER_ID) {
    config.services = {
      ...config.services,
      analytics: {
        ...config.services?.analytics,
        googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
      },
    };
  }
  
  // UI
  if (process.env.TOAST_LIMIT) {
    config.ui = {
      ...config.ui,
      toastLimit: parseInt(process.env.TOAST_LIMIT),
    };
  }
  if (process.env.TOAST_REMOVE_DELAY) {
    config.ui = {
      ...config.ui,
      toastRemoveDelay: parseInt(process.env.TOAST_REMOVE_DELAY),
    };
  }
  if (process.env.CAROUSEL_DELAY) {
    config.ui = {
      ...config.ui,
      carouselDelay: parseInt(process.env.CAROUSEL_DELAY),
    };
  }
  
  // AI Configuration
  if (process.env.AI_PROVIDER) {
    config.ai = {
      ...config.ai,
      provider: process.env.AI_PROVIDER,
    };
  }
  if (process.env.AI_FALLBACK_PROVIDER) {
    config.ai = {
      ...config.ai,
      fallbackProvider: process.env.AI_FALLBACK_PROVIDER,
    };
  }
  if (process.env.AI_TIMEOUT) {
    config.ai = {
      ...config.ai,
      timeout: parseInt(process.env.AI_TIMEOUT),
    };
  }
  if (process.env.AI_RETRY_ATTEMPTS) {
    config.ai = {
      ...config.ai,
      retryAttempts: parseInt(process.env.AI_RETRY_ATTEMPTS),
    };
  }
  if (process.env.AI_CIRCUIT_BREAKER_ENABLED) {
    config.ai = {
      ...config.ai,
      enableCircuitBreaker: process.env.AI_CIRCUIT_BREAKER_ENABLED === 'true',
    };
  }
  if (process.env.AI_CIRCUIT_BREAKER_THRESHOLD) {
    config.ai = {
      ...config.ai,
      circuitBreakerThreshold: parseInt(process.env.AI_CIRCUIT_BREAKER_THRESHOLD),
    };
  }
  if (process.env.AI_CIRCUIT_BREAKER_TIMEOUT) {
    config.ai = {
      ...config.ai,
      circuitBreakerTimeout: parseInt(process.env.AI_CIRCUIT_BREAKER_TIMEOUT),
    };
  }
  if (process.env.AI_LOGGING_ENABLED) {
    config.ai = {
      ...config.ai,
      enableLogging: process.env.AI_LOGGING_ENABLED === 'true',
    };
  }
  if (process.env.AI_LOG_LEVEL) {
    const validAILogLevels: Array<AppConfig['ai']['logLevel']> = ['debug', 'info', 'warn', 'error'];
    const aiLogLevel = process.env.AI_LOG_LEVEL as AppConfig['ai']['logLevel'];
    if (validAILogLevels.includes(aiLogLevel)) {
      config.ai = {
        ...config.ai,
        logLevel: aiLogLevel,
      };
    }
  }
  
  // Cache
  if (process.env.STATIC_CACHE_NAME) {
    config.cache = {
      ...config.cache,
      staticCacheName: process.env.STATIC_CACHE_NAME,
    };
  }
  if (process.env.RUNTIME_CACHE_NAME) {
    config.cache = {
      ...config.cache,
      runtimeCacheName: process.env.RUNTIME_CACHE_NAME,
    };
  }
  if (process.env.PRECACHE_URLS) {
    try {
      config.cache = {
        ...config.cache,
        precacheUrls: JSON.parse(process.env.PRECACHE_URLS),
      };
    } catch (error) {
      console.warn('Failed to parse PRECACHE_URLS, using defaults');
    }
  }
  
  return config;
}

/**
 * Validate configuration
 */
export function validateAppConfig(config: AppConfig): void {
  // Validate required fields
  if (!config.baseUrl) {
    throw new Error('Base URL is required');
  }
  
  if (!config.apiUrl) {
    throw new Error('API URL is required');
  }
  
  // Validate security settings
  if (config.security.rateLimitWindow <= 0) {
    throw new Error('Rate limit window must be positive');
  }
  
  if (config.security.rateLimitMaxRequests <= 0) {
    throw new Error('Rate limit max requests must be positive');
  }
  
  // Validate logging settings
  if (config.logging.maxQueueSize <= 0) {
    throw new Error('Log max queue size must be positive');
  }
  
  if (config.logging.flushInterval <= 0) {
    throw new Error('Log flush interval must be positive');
  }
  
  // Validate UI settings
  if (config.ui.toastLimit <= 0) {
    throw new Error('Toast limit must be positive');
  }
  
  if (config.ui.toastRemoveDelay <= 0) {
    throw new Error('Toast remove delay must be positive');
  }
  
  if (config.ui.carouselDelay <= 0) {
    throw new Error('Carousel delay must be positive');
  }
}

/**
 * Environment-specific configurations
 */
export const appConfigs: Record<string, AppConfig> = {
  development: {
    ...defaultAppConfig,
    environment: 'development',
    isDevelopment: true,
    isProduction: false,
    logging: {
      ...defaultAppConfig.logging,
      level: 'debug' as AppConfig['logging']['level'],
    },
  },
  staging: {
    ...defaultAppConfig,
    environment: 'staging',
    isDevelopment: false,
    isProduction: false,
    security: {
      ...defaultAppConfig.security,
      rateLimitMaxRequests: 100,
    },
    logging: {
      ...defaultAppConfig.logging,
      level: 'info' as AppConfig['logging']['level'],
    },
  },
  production: {
    ...defaultAppConfig,
    environment: 'production',
    isDevelopment: false,
    isProduction: true,
    security: {
      ...defaultAppConfig.security,
      rateLimitMaxRequests: 30,
    },
    logging: {
      ...defaultAppConfig.logging,
      level: 'warn' as AppConfig['logging']['level'],
    },
  },
};

/**
 * Get configuration for specific environment
 */
export function getConfigForEnvironment(env: string = 'development'): AppConfig {
  switch (env) {
    case 'production':
      return appConfigs.production;
    case 'staging':
      return appConfigs.staging;
    case 'development':
    default:
      return appConfigs.development;
  }
}