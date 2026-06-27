/**
 * Factory class for creating AI service instances
 * Supports multiple providers and allows runtime switching
 */

import { IAIService } from '@/ai/services/ai-service.interface';
import { GoogleAIService } from '@/ai/services/google-ai.service';

export enum AIProvider {
  GOOGLE_AI = 'google-ai',
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  MOCK = 'mock' // For testing purposes
}

export interface AIServiceConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
  timeout?: number;
  retryAttempts?: number;
}

/**
 * Mock AI service for testing and development
 */
export class MockAIService implements IAIService {
  async getSolutionRecommendation(input: any): Promise<any> {
    return {
      executiveSummary: {
        overview: "This is a mock solution recommendation for testing purposes.",
        primaryOpportunity: "Mock opportunity based on your business needs.",
        expectedRoiTimeframe: "3-6 months"
      },
      recommendedSolutionPath: {
        coreTechnology: {
          solutionName: "Mock AI Solution",
          justification: "This is a mock justification for the recommended solution."
        },
        expectedOutcomes: [
          {
            metric: "Customer Support Tickets",
            currentState: "100 tickets/day",
            projectedImprovement: "Reduced by 30-40%",
            timeframe: "First 30 days"
          }
        ]
      },
      nextSteps: [
        {
          actionItem: "Schedule consultation call",
          owner: "Client",
          deadline: "Within 24 hours"
        }
      ]
    };
  }

  async getAutomatedTaskDesign(input: any): Promise<any> {
    return {
      taskName: "Mock Automated Task",
      objective: "This is a mock automation objective for testing.",
      trigger: "Manual trigger for testing",
      steps: [
        {
          stepNumber: 1,
          action: "Mock Action 1",
          details: "This is a mock step description for testing purposes."
        }
      ],
      integrations: ["Mock Integration 1"],
      optimizations: ["Mock optimization suggestion"],
      estimatedImpact: "Saves approx. 2-3 hours per week"
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  getProviderName(): string {
    return 'Mock AI Service';
  }
}

export class AIServiceFactory {
  private static instances: Map<AIProvider, IAIService> = new Map();

  /**
   * Get or create an AI service instance
   */
  public static getService(config: AIServiceConfig): IAIService {
    const { provider } = config;

    // Return existing instance if available
    if (this.instances.has(provider)) {
      return this.instances.get(provider)!;
    }

    let service: IAIService;

    switch (provider) {
      case AIProvider.GOOGLE_AI:
        service = GoogleAIService.getInstance();
        break;
      
      case AIProvider.MOCK:
        service = new MockAIService();
        break;
      
      // Future providers can be added here
      // case AIProvider.OPENAI:
      //   service = new OpenAIService(config);
      //   break;
      // case AIProvider.ANTHROPIC:
      //   service = new AnthropicService(config);
      //   break;
      
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }

    this.instances.set(provider, service);
    return service;
  }

  /**
   * Get service by provider name (string)
   */
  public static getServiceByName(providerName: string, config?: Partial<AIServiceConfig>): IAIService {
    const provider = this.parseProvider(providerName);
    return this.getService({ ...config, provider });
  }

  /**
   * Parse provider name to enum
   */
  private static parseProvider(providerName: string): AIProvider {
    const normalized = providerName.toLowerCase().replace(/[^a-z-]/g, '');
    
    switch (normalized) {
      case 'googleai':
      case 'google-ai':
      case 'gemini':
        return AIProvider.GOOGLE_AI;
      
      case 'mock':
      case 'test':
        return AIProvider.MOCK;
      
      // Future providers
      // case 'openai':
      // case 'open-ai':
      //   return AIProvider.OPENAI;
      // case 'anthropic':
      // case 'claude':
      //   return AIProvider.ANTHROPIC;
      
      default:
        // Default to Google AI for backward compatibility
        return AIProvider.GOOGLE_AI;
    }
  }

  /**
   * Clear all cached instances
   */
  public static clearInstances(): void {
    this.instances.clear();
  }

  /**
   * Get available providers
   */
  public static getAvailableProviders(): AIProvider[] {
    return [
      AIProvider.GOOGLE_AI,
      AIProvider.MOCK,
      // Future providers will be added here
    ];
  }
}