/**
 * Configuration Module
 * Centralized configuration management for the application
 */

// Export configuration types and interfaces
export type { AppConfig } from '@/config/app.config';

// Export configuration manager
export {
  ConfigManager,
  getConfigManager,
  getConfig,
  initializeConfig,
} from '@/config/config-manager';

// Export default configuration for backward compatibility
export { defaultAppConfig } from '@/config/app.config';