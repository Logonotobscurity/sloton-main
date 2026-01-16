/**
 * Example component showing how to use the new AI service with dependency injection
 * This demonstrates the improved pattern compared to the old direct import approach
 */

'use client';

import { useState } from 'react';
import { getSolutionRecommendationAction, getAutomatedTaskDesign } from '@/app/actions';
import { SolutionRecommendationOutput } from '@/ai';

/**
 * BEFORE (Old Pattern):
 * Components directly imported and used AI flows, making them hard to test and inflexible
 */

// import { getSolutionRecommendation } from '@/app/actions';
// const result = await getSolutionRecommendation(data);

/**
 * AFTER (New Pattern with Dependency Injection):
 * - Centralized service management
 * - Configurable providers
 * - Error handling and fallbacks
 * - Easy testing with mock services
 * - Environment-based configuration
 */

export function AIServiceExample() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SolutionRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolutionRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      const input = {
        industry: 'e-commerce',
        challenge: 'We need to automate our customer support to reduce response time and improve customer satisfaction.',
        goals: 'Reduce response time by 50% and improve customer satisfaction scores by 30%'
      };

      // The new actions automatically use the AI service manager with dependency injection
      const response = await getSolutionRecommendationAction(input);

      setResult(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAutomatedTaskDesign = async () => {
    setLoading(true);
    setError(null);

    try {
      const input = {
        workflowDescription: 'Automatically process and categorize incoming customer emails based on urgency and topic.',
        optimizationSuggestions: 'Add sentiment analysis and automatic routing to appropriate team members.'
      };

      // The new actions automatically use the AI service manager with dependency injection
      const response = await getAutomatedTaskDesign(input);

      if (response.error) {
        setError(response.error);
      } else {
        console.log('Automated task design result:', response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">AI Service Example</h2>
      
      <div className="space-y-4">
        <button
          onClick={handleSolutionRecommendation}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Get Solution Recommendation'}
        </button>

        <button
          onClick={handleAutomatedTaskDesign}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ml-4"
        >
          {loading ? 'Processing...' : 'Design Automated Task'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-bold mb-2">Solution Recommendation</h3>
          <p><strong>Overview:</strong> {result.executiveSummary.overview}</p>
          <p><strong>Primary Opportunity:</strong> {result.executiveSummary.primaryOpportunity}</p>
          <p><strong>Expected ROI Timeframe:</strong> {result.executiveSummary.expectedRoiTimeframe}</p>
        </div>
      )}
    </div>
  );
}

/**
 * BENEFITS OF THE NEW DEPENDENCY INJECTION SYSTEM:
 * 
 * 1. TESTABILITY:
 *    - Easy to mock AI services in tests
 *    - Can use MockAIService for development/testing
 *    - No need to modify component code for testing
 * 
 * 2. CONFIGURABILITY:
 *    - Switch AI providers via environment variables
 *    - Configure timeouts, retry attempts, circuit breakers
 *    - Environment-specific configurations (dev/staging/prod)
 * 
 * 3. RELIABILITY:
 *    - Automatic fallback to backup providers
 *    - Circuit breaker pattern prevents cascading failures
 *    - Comprehensive error handling and logging
 * 
 * 4. MAINTAINABILITY:
 *    - Centralized service management
 *    - Clean separation of concerns
 *    - Easy to add new AI providers
 * 
 * 5. MONITORING:
 *    - Built-in health checks
 *    - Service status monitoring
 *    - Performance metrics and logging
 */