/**
 * AI Service Configuration
 * Centralized configuration for AI services with environment-based settings
 */

import { AIProvider } from '@/ai/services';
import { getConfig } from '@/config';

export interface AIConfig {
  provider: AIProvider;
  fallbackProvider?: AIProvider;
  timeout: number;
  retryAttempts: number;
  enableCircuitBreaker: boolean;
  circuitBreakerThreshold: number;
  circuitBreakerTimeout: number;
  enableLogging: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Default AI configuration
 */
export const defaultAIConfig: AIConfig = {
  provider: AIProvider.GOOGLE_AI,
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  enableCircuitBreaker: true,
  circuitBreakerThreshold: 5,
  circuitBreakerTimeout: 60000, // 1 minute
  enableLogging: true,
  logLevel: 'info'
};

/**
 * Get AI configuration from environment variables
 */
export function getAIConfigFromEnvironment(): AIConfig {
  const config = getConfig();
  const aiConfig = config.ai;
  
  // Convert string provider to AIProvider enum
  let provider: AIProvider;
  switch (aiConfig.provider.toLowerCase()) {
    case 'google-ai':
    case 'googleai':
    case 'gemini':
      provider = AIProvider.GOOGLE_AI;
      break;
    case 'mock':
      provider = AIProvider.MOCK;
      break;
    default:
      provider = AIProvider.GOOGLE_AI; // Default fallback
  }
  
  // Convert fallback provider if exists
  let fallbackProvider: AIProvider | undefined;
  if (aiConfig.fallbackProvider) {
    switch (aiConfig.fallbackProvider.toLowerCase()) {
      case 'google-ai':
      case 'googleai':
      case 'gemini':
        fallbackProvider = AIProvider.GOOGLE_AI;
        break;
      case 'mock':
        fallbackProvider = AIProvider.MOCK;
        break;
      default:
        fallbackProvider = undefined;
    }
  }
  
  return {
    provider,
    fallbackProvider,
    timeout: aiConfig.timeout,
    retryAttempts: aiConfig.retryAttempts,
    enableCircuitBreaker: aiConfig.enableCircuitBreaker,
    circuitBreakerThreshold: aiConfig.circuitBreakerThreshold,
    circuitBreakerTimeout: aiConfig.circuitBreakerTimeout,
    enableLogging: aiConfig.enableLogging,
    logLevel: aiConfig.logLevel
  };
}

/**
 * Validate AI configuration
 */
export function validateAIConfig(config: AIConfig): void {
  if (!config.provider) {
    throw new Error('AI provider is required');
  }

  if (config.timeout <= 0) {
    throw new Error('AI timeout must be positive');
  }

  if (config.retryAttempts < 0) {
    throw new Error('AI retry attempts must be non-negative');
  }

  if (config.enableCircuitBreaker) {
    if (config.circuitBreakerThreshold <= 0) {
      throw new Error('Circuit breaker threshold must be positive');
    }

    if (config.circuitBreakerTimeout <= 0) {
      throw new Error('Circuit breaker timeout must be positive');
    }
  }

  const validLogLevels = ['debug', 'info', 'warn', 'error'];
  if (!validLogLevels.includes(config.logLevel)) {
    throw new Error(`Invalid log level: ${config.logLevel}. Must be one of: ${validLogLevels.join(', ')}`);
  }
}

/**
 * Environment-specific configurations
 */
export const aiConfigs = {
  development: {
    ...defaultAIConfig,
    provider: AIProvider.GOOGLE_AI,
    fallbackProvider: AIProvider.MOCK,
    enableLogging: true,
    logLevel: 'debug' as const
  },
  
  staging: {
    ...defaultAIConfig,
    provider: AIProvider.GOOGLE_AI,
    timeout: 45000, // Longer timeout for staging
    enableLogging: true,
    logLevel: 'info' as const
  },
  
  production: {
    ...defaultAIConfig,
    provider: AIProvider.GOOGLE_AI,
    timeout: 60000, // Even longer timeout for production
    enableCircuitBreaker: true,
    circuitBreakerThreshold: 3, // Lower threshold for production
    enableLogging: true,
    logLevel: 'warn' as const // Less verbose in production
  }
};

/**
 * Get configuration for current environment
 */
export function getConfigForEnvironment(env?: string): AIConfig {
  const config = getConfig();
  const environment = env || config.environment;
  
  switch (environment) {
    case 'production':
      return aiConfigs.production;
    case 'staging':
      return aiConfigs.staging;
    case 'development':
    case 'test':
    default:
      return aiConfigs.development;
  }
}