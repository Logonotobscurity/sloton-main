/**
 * Interface for AI service providers
 * This allows swapping different AI providers (Google AI, OpenAI, Anthropic, etc.)
 */

import { SolutionRecommendationInput, SolutionRecommendationOutput } from '@/ai/flows/solution-recommendation';
import { AutomateTaskDesignInput, AutomateTaskDesignOutput } from '@/ai/flows/automated-task-design';

export interface IAIService {
  /**
   * Generate solution recommendations based on business needs
   */
  getSolutionRecommendation(input: SolutionRecommendationInput): Promise<SolutionRecommendationOutput>;

  /**
   * Design automated task workflows
   */
  getAutomatedTaskDesign(input: AutomateTaskDesignInput): Promise<AutomateTaskDesignOutput>;

  /**
   * Health check for the AI service
   */
  healthCheck(): Promise<boolean>;

  /**
   * Get service provider name
   */
  getProviderName(): string;
}