/**
 * AI Service Manager
 * Handles AI service configuration, error handling, and fallback mechanisms
 */

import { IAIService, AIServiceFactory, AIProvider, AIServiceConfig } from './services';
import { logger } from '@/lib/logger';

export interface AIManagerConfig {
  primaryProvider: AIProvider;
  fallbackProvider?: AIProvider;
  timeout?: number;
  retryAttempts?: number;
  enableCircuitBreaker?: boolean;
  circuitBreakerThreshold?: number;
  circuitBreakerTimeout?: number;
}

export class AIServiceManager {
  private primaryService: IAIService;
  private fallbackService?: IAIService;
  private config: AIManagerConfig;
  private failureCount: number = 0;
  private circuitBreakerOpen: boolean = false;
  private circuitBreakerResetTime: number = 0;

  constructor(config: AIManagerConfig) {
    this.config = config;
    this.primaryService = AIServiceFactory.getService({
      provider: config.primaryProvider,
      timeout: config.timeout,
      retryAttempts: config.retryAttempts
    });

    if (config.fallbackProvider) {
      this.fallbackService = AIServiceFactory.getService({
        provider: config.fallbackProvider,
        timeout: config.timeout,
        retryAttempts: config.retryAttempts
      });
    }
  }

  /**
   * Execute an AI operation with error handling and fallback
   */
  private async executeWithFallback<T>(
    operation: (service: IAIService) => Promise<T>,
    operationName: string
  ): Promise<T> {
    // Check circuit breaker
    if (this.config.enableCircuitBreaker && this.circuitBreakerOpen) {
      const now = Date.now();
      if (now < this.circuitBreakerResetTime) {
        logger.warn(`Circuit breaker open for ${operationName}, attempting fallback`);
        if (this.fallbackService) {
          return await this.executeWithRetry(operation, this.fallbackService, operationName, true);
        }
        throw new Error('Circuit breaker open and no fallback service available');
      } else {
        // Reset circuit breaker
        this.circuitBreakerOpen = false;
        this.failureCount = 0;
      }
    }

    // Try primary service
    try {
      const result = await this.executeWithRetry(operation, this.primaryService, operationName, false);
      this.resetFailures();
      return result;
    } catch (error) {
      logger.error(`Primary service failed for ${operationName}:`, error);
      this.recordFailure();

      // Try fallback service
      if (this.fallbackService) {
        try {
          const result = await this.executeWithRetry(operation, this.fallbackService, operationName, true);
          logger.info(`Fallback service succeeded for ${operationName}`);
          return result;
        } catch (fallbackError) {
          logger.error(`Fallback service also failed for ${operationName}:`, fallbackError);
          throw new Error(`Both primary and fallback services failed for ${operationName}`);
        }
      }

      throw error;
    }
  }

  /**
   * Execute with retry logic
   */
  private async executeWithRetry<T>(
    operation: (service: IAIService) => Promise<T>,
    service: IAIService,
    operationName: string,
    isFallback: boolean
  ): Promise<T> {
    const maxRetries = this.config.retryAttempts || 3;
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(`Attempting ${operationName} with ${service.getProviderName()} (attempt ${attempt}/${maxRetries})`);
        return await operation(service);
      } catch (error) {
        lastError = error as Error;
        logger.warn(`Attempt ${attempt} failed for ${operationName}:`, error);
        
        if (attempt < maxRetries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt - 1) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }

  /**
   * Record a failure for circuit breaker
   */
  private recordFailure(): void {
    this.failureCount++;
    
    if (this.config.enableCircuitBreaker && 
        this.failureCount >= (this.config.circuitBreakerThreshold || 5)) {
      this.circuitBreakerOpen = true;
      this.circuitBreakerResetTime = Date.now() + (this.config.circuitBreakerTimeout || 60000);
      logger.warn('Circuit breaker opened due to repeated failures');
    }
  }

  /**
   * Reset failure count on success
   */
  private resetFailures(): void {
    this.failureCount = 0;
  }

  /**
   * Get solution recommendation with error handling
   */
  async getSolutionRecommendation(input: any): Promise<any> {
    return this.executeWithFallback(
      service => service.getSolutionRecommendation(input),
      'getSolutionRecommendation'
    );
  }

  /**
   * Get automated task design with error handling
   */
  async getAutomatedTaskDesign(input: any): Promise<any> {
    return this.executeWithFallback(
      service => service.getAutomatedTaskDesign(input),
      'getAutomatedTaskDesign'
    );
  }

  /**
   * Health check for all services
   */
  async healthCheck(): Promise<{
    primary: boolean;
    fallback?: boolean;
    circuitBreaker: boolean;
    failureCount: number;
  }> {
    const primaryHealth = await this.primaryService.healthCheck();
    let fallbackHealth: boolean | undefined;

    if (this.fallbackService) {
      fallbackHealth = await this.fallbackService.healthCheck();
    }

    return {
      primary: primaryHealth,
      fallback: fallbackHealth,
      circuitBreaker: this.circuitBreakerOpen,
      failureCount: this.failureCount
    };
  }

  /**
   * Get service information
   */
  getServiceInfo(): {
    primaryProvider: string;
    fallbackProvider?: string;
    circuitBreakerStatus: string;
  } {
    return {
      primaryProvider: this.primaryService.getProviderName(),
      fallbackProvider: this.fallbackService?.getProviderName(),
      circuitBreakerStatus: this.circuitBreakerOpen ? 'OPEN' : 'CLOSED'
    };
  }

  /**
   * Create manager from environment configuration
   */
  static createFromEnvironment(): AIServiceManager {
    const { getConfig } = require('@/config');
    const appConfig = getConfig();
    const aiConfig = appConfig.ai;
    
    const config: AIManagerConfig = {
      primaryProvider: aiConfig.provider as AIProvider,
      fallbackProvider: aiConfig.fallbackProvider as AIProvider | undefined,
      timeout: aiConfig.timeout,
      retryAttempts: aiConfig.retryAttempts,
      enableCircuitBreaker: aiConfig.enableCircuitBreaker,
      circuitBreakerThreshold: aiConfig.circuitBreakerThreshold,
      circuitBreakerTimeout: aiConfig.circuitBreakerTimeout
    };

    return new AIServiceManager(config);
  }
}