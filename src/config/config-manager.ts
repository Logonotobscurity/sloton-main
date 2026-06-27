/**
 * Configuration Manager
 * Manages application configuration with environment-specific settings and validation
 */

import { logger } from '@/lib/logger';
import { AppConfig, defaultAppConfig, getAppConfigFromEnvironment, validateAppConfig, getConfigForEnvironment } from '@/config/app.config';

export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;
  private initialized: boolean = false;

  private constructor() {
    this.config = { ...defaultAppConfig };
  }

  /**
   * Get the singleton instance of ConfigManager
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Initialize the configuration manager
   */
  public initialize(overrides?: Partial<AppConfig>): void {
    if (this.initialized) {
      logger.warn('ConfigManager already initialized');
      return;
    }

    try {
      // Start with default configuration
      let config = { ...defaultAppConfig };

      // Apply environment-specific configuration
      const env = config.environment || 'development';
      const envConfig = getConfigForEnvironment(env);
      config = { ...config, ...envConfig };

      // Apply environment variable overrides
      const envOverrides = getAppConfigFromEnvironment();
      config = { ...config, ...envOverrides };

      // Apply manual overrides
      if (overrides) {
        config = { ...config, ...overrides };
      }

      // Validate the final configuration
      validateAppConfig(config);

      this.config = config;
      this.initialized = true;

      // Configure logger with actual config values (optional - logger has defaults)
      logger.configure({
        maxQueueSize: config.logging.maxQueueSize,
        endpoint: config.logging.endpoint,
        flushInterval: config.logging.flushInterval,
        isDevelopment: config.isDevelopment
      });

      logger.info('Configuration initialized', { environment: config.environment });
    } catch (error) {
      logger.error('Failed to initialize configuration', { error });
      throw error;
    }
  }

  /**
   * Get the current configuration
   */
  public getConfig(): AppConfig {
    if (!this.initialized) {
      logger.warn('ConfigManager not initialized, returning default config');
      return { ...defaultAppConfig };
    }
    return { ...this.config };
  }

  /**
   * Get a specific configuration section
   */
  public getSecurityConfig() {
    return this.getConfig().security;
  }

  public getLoggingConfig() {
    return this.getConfig().logging;
  }

  public getServicesConfig() {
    return this.getConfig().services;
  }

  public getUIConfig() {
    return this.getConfig().ui;
  }

  public getCacheConfig() {
    return this.getConfig().cache;
  }

  /**
   * Update configuration (use with caution)
   */
  public updateConfig(updates: Partial<AppConfig>): void {
    if (!this.initialized) {
      throw new Error('ConfigManager not initialized');
    }

    const newConfig = { ...this.config, ...updates };
    validateAppConfig(newConfig);
    this.config = newConfig;
  }

  /**
   * Check if running in development mode
   */
  public isDevelopment(): boolean {
    return this.getConfig().isDevelopment;
  }

  /**
   * Check if running in production mode
   */
  public isProduction(): boolean {
    return this.getConfig().isProduction;
  }

  /**
   * Get current environment
   */
  public getEnvironment(): string {
    return this.getConfig().environment;
  }

  /**
   * Reset configuration to defaults
   */
  public reset(): void {
    this.config = { ...defaultAppConfig };
    this.initialized = false;
  }
}

/**
 * Convenience function to get the configuration manager instance
 */
export function getConfigManager(): ConfigManager {
  return ConfigManager.getInstance();
}

/**
 * Convenience function to get the current configuration
 */
export function getConfig(): AppConfig {
  return getConfigManager().getConfig();
}

/**
 * Initialize the configuration system
 */
export function initializeConfig(overrides?: Partial<AppConfig>): void {
  getConfigManager().initialize(overrides);
}