/**
 * AI Service Type Definitions
 * Replaces 'any' types with proper TypeScript interfaces
 */

/**
 * Solution Recommendation Input
 */
export interface SolutionRecommendationInput {
  industry: string;
  companySize: string;
  challenges: string;
  budget?: string;
  timeline?: string;
  email: string;
  name: string;
}

/**
 * Solution Recommendation Output
 */
export interface SolutionRecommendation {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  estimatedCost: string;
  implementationTime: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface SolutionRecommendationOutput {
  recommendations: SolutionRecommendation[];
  confidence: number;
  reasoning: string;
  nextSteps: string[];
}

/**
 * Automated Task Design Input
 */
export interface AutomatedTaskDesignInput {
  taskName: string;
  taskDescription: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'on-demand';
  currentProcess: string;
  desiredOutcome: string;
  email: string;
  name: string;
}

/**
 * Automated Task Design Output
 */
export interface TaskStep {
  stepNumber: number;
  action: string;
  description: string;
  estimatedTime: string;
  automationPotential: 'high' | 'medium' | 'low';
}

export interface AutomatedTaskDesignOutput {
  taskId: string;
  optimizedWorkflow: TaskStep[];
  automationScore: number;
  estimatedTimeSavings: string;
  requiredTools: string[];
  implementationComplexity: 'simple' | 'moderate' | 'complex';
  recommendations: string[];
}

/**
 * AI Service Error
 */
export interface AIServiceError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * AI Service Response Wrapper
 */
export interface AIServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: AIServiceError;
  timestamp: string;
}
