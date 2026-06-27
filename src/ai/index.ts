/**
 * AI Module exports
 * Centralized exports for all AI-related functionality
 */

// Services
export * from '@/ai/services';

// Configuration
export * from '@/ai/ai-config';

// Service Manager
export { AIServiceManager } from '@/ai/ai-service-manager';

// Flow types (for backward compatibility)
export type { SolutionRecommendationInput, SolutionRecommendationOutput } from '@/ai/flows/solution-recommendation';
export type { AutomateTaskDesignInput, AutomateTaskDesignOutput } from '@/ai/flows/automated-task-design';