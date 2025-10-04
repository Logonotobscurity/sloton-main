/**
 * AI Module exports
 * Centralized exports for all AI-related functionality
 */

// Services
export * from './services';

// Configuration
export * from './ai-config';

// Service Manager
export { AIServiceManager } from './ai-service-manager';

// Flow types (for backward compatibility)
export type { SolutionRecommendationInput, SolutionRecommendationOutput } from './flows/solution-recommendation';
export type { AutomateTaskDesignInput, AutomateTaskDesignOutput } from './flows/automated-task-design';