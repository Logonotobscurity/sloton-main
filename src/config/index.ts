/**
 * Configuration Module
 * Centralized configuration management for the application
 */

// Export configuration types and interfaces
export type { AppConfig } from './app.config';

// Export configuration manager
export {
  ConfigManager,
  getConfigManager,
  getConfig,
  initializeConfig,
} from './config-manager';

// Export default configuration for backward compatibility
export { defaultAppConfig } from './app.config';