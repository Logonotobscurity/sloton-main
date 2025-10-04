# Configuration Management System

A centralized configuration management system that externalizes hardcoded values and provides environment-specific settings with validation and type safety.

## Overview

The configuration system provides:
- **Centralized Configuration**: All app settings in one place
- **Environment-Specific Settings**: Different configs for dev/staging/production
- **Environment Variable Integration**: Override settings via environment variables
- **Type Safety**: Full TypeScript support with validation
- **Singleton Pattern**: Consistent configuration across the application

## Architecture

```
src/config/
├── app.config.ts          # Main configuration interface and defaults
├── config-manager.ts      # Configuration manager with singleton pattern
├── index.ts              # Module exports
└── README.md             # This documentation
```

## Key Components

### 1. AppConfig Interface (`app.config.ts`)

Defines the structure of all configuration options:

```typescript
interface AppConfig {
  environment: string;
  isDevelopment: boolean;
  isProduction: boolean;
  
  baseUrl: string;
  apiUrl: string;
  
  security: {
    rateLimitWindow: number;
    rateLimitMaxRequests: number;
    jwtExpiry: string;
    jwtRefreshExpiry: string;
    csrfCookieName: string;
    csrfHeaderName: string;
  };
  
  logging: {
    maxQueueSize: number;
    flushInterval: number;
    endpoint: string;
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  
  services: {
    resend: {
      apiKey?: string;
      fromEmail: string;
      toEmail: string;
    };
    whatsapp: {
      link: string;
    };
    analytics: {
      matomoUrl: string;
      siteId: number;
    };
  };
  
  ui: {
    toastLimit: number;
    toastRemoveDelay: number;
    carouselDelay: number;
    animationDelayStep: number;
  };
  
  cache: {
    staticCacheName: string;
    runtimeCacheName: string;
  };
}
```

### 2. ConfigManager (`config-manager.ts`)

Provides a singleton instance for managing configuration:

```typescript
class ConfigManager {
  initialize(overrides?: Partial<AppConfig>): void
  getConfig(): AppConfig
  getSecurityConfig(): SecurityConfig
  getLoggingConfig(): LoggingConfig
  getServicesConfig(): ServicesConfig
  getUIConfig(): UIConfig
  getCacheConfig(): CacheConfig
  isDevelopment(): boolean
  isProduction(): boolean
  getEnvironment(): string
  updateConfig(updates: Partial<AppConfig>): void
  reset(): void
}
```

## Usage

### Basic Usage

```typescript
import { getConfig, initializeConfig } from '@/config';

// Initialize configuration (usually done in app root)
initializeConfig();

// Get configuration anywhere in your application
const config = getConfig();
console.log(config.baseUrl);
console.log(config.security.rateLimitWindow);
```

### Using Specific Configuration Sections

```typescript
import { getConfigManager } from '@/config';

const configManager = getConfigManager();

// Get specific configuration sections
const securityConfig = configManager.getSecurityConfig();
const loggingConfig = configManager.getLoggingConfig();
const servicesConfig = configManager.getServicesConfig();
const uiConfig = configManager.getUIConfig();
const cacheConfig = configManager.getCacheConfig();

// Check environment
if (configManager.isDevelopment()) {
  console.log('Running in development mode');
}
```

### Environment-Specific Configuration

The system automatically applies environment-specific settings based on `NODE_ENV`:

```typescript
// Development environment
{
  logging: { level: 'debug' },
  security: { rateLimitMaxRequests: 100 }
}

// Production environment
{
  logging: { level: 'warn' },
  security: { rateLimitMaxRequests: 30 }
}
```

## Environment Variables

All configuration values can be overridden using environment variables:

### Core Settings
```bash
NODE_ENV=production
BASE_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
```

### Security Settings
```bash
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=60
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d
```

### Logging Settings
```bash
LOG_MAX_QUEUE_SIZE=100
LOG_FLUSH_INTERVAL=30000
LOG_ENDPOINT=/api/logs
LOGGING_ENABLED=true
LOG_LEVEL=info
```

### Service Settings
```bash
RESEND_FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=contact@yourdomain.com
WHATSAPP_LINK=https://wa.me/your-number
MATOMO_URL=https://your-matomo-domain.com/
MATOMO_SITE_ID=1
```

### UI Settings
```bash
TOAST_LIMIT=1
TOAST_REMOVE_DELAY=1000000
CAROUSEL_DELAY=5000
```

### Cache Settings
```bash
STATIC_CACHE_NAME=your-app-cache-v1
RUNTIME_CACHE_NAME=your-runtime-cache
```

## Migration Examples

### Before (Hardcoded Values)

```typescript
// In security.ts
export const SECURITY_CONSTANTS = {
  RATE_LIMIT: {
    WINDOW: 60 * 1000, // 1 minute
    MAX_REQUESTS: 60,
  },
  JWT: {
    EXPIRY: '1h',
    REFRESH_EXPIRY: '7d',
  }
};

// In logger.ts
private readonly maxQueueSize: number = 100;
private readonly logEndpoint: string = '/api/logs';

// In components
const whatsappLink = "https://wa.me/qr/QFSBRGKZGHP3F1";
```

### After (Centralized Configuration)

```typescript
// In security.ts
export const SECURITY_CONSTANTS = {
  RATE_LIMIT: {
    WINDOW: getConfig().security.rateLimitWindow,
    MAX_REQUESTS: getConfig().security.rateLimitMaxRequests,
  },
  JWT: {
    EXPIRY: getConfig().security.jwtExpiry,
    REFRESH_EXPIRY: getConfig().security.jwtRefreshExpiry,
  }
};

// In logger.ts
private readonly maxQueueSize: number;
private readonly logEndpoint: string;

private constructor() {
  const config = getConfig().logging;
  this.maxQueueSize = config.maxQueueSize;
  this.logEndpoint = config.endpoint;
}

// In components
const whatsappLink = getConfig().services.whatsapp.link;
```

## Validation

Configuration is automatically validated during initialization:

```typescript
// This will throw an error if configuration is invalid
initializeConfig();

// Manual validation
import { validateAppConfig } from '@/config/app.config';

try {
  validateAppConfig(myConfig);
} catch (error) {
  console.error('Invalid configuration:', error.message);
}
```

## Best Practices

1. **Initialize Early**: Call `initializeConfig()` in your app's root component
2. **Use TypeScript**: Leverage type safety for configuration values
3. **Environment Variables**: Use environment variables for sensitive or environment-specific values
4. **Validation**: Always validate configuration before using in production
5. **Documentation**: Document your configuration options and their purposes
6. **Testing**: Use different configurations for testing different scenarios

## Error Handling

The configuration system includes comprehensive validation:

- Required field validation
- Positive number validation for numeric settings
- String format validation for URLs and emails
- Environment-specific validation rules

## Testing

```typescript
import { ConfigManager } from '@/config/config-manager';

// Create a test configuration
const testConfig = {
  environment: 'test',
  baseUrl: 'http://localhost:3000',
  // ... other test settings
};

// Initialize with test config
const configManager = ConfigManager.getInstance();
configManager.initialize(testConfig);

// Reset configuration after tests
afterEach(() => {
  configManager.reset();
});
```

## Troubleshooting

### Configuration Not Loading
- Ensure `initializeConfig()` is called before using configuration
- Check that environment variables are properly set
- Verify configuration validation passes

### Type Errors
- Import configuration types from the correct modules
- Use the provided type definitions and interfaces

### Environment Variables Not Working
- Check variable names match the expected format
- Ensure variables are available in the runtime environment
- Restart your development server after changing environment variables