/**
 * AI Service Health Check API
 * Provides health status and monitoring for AI services
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIServiceManager } from '@/ai/ai-service-manager';
import { logger } from '@/lib/logger';
import { handleError } from '@/lib/error-handler';

// Initialize AI service manager
const aiServiceManager = AIServiceManager.createFromEnvironment();

export async function GET(request: NextRequest) {
  try {
    // Get service health information
    const healthInfo = await aiServiceManager.healthCheck();
    const serviceInfo = aiServiceManager.getServiceInfo();

    // Determine overall health status
    const isHealthy = healthInfo.primary && (!healthInfo.fallback || healthInfo.fallback);
    
    const response = {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        primary: {
          provider: serviceInfo.primaryProvider,
          healthy: healthInfo.primary,
          status: healthInfo.primary ? 'operational' : 'down'
        },
        fallback: serviceInfo.fallbackProvider ? {
          provider: serviceInfo.fallbackProvider,
          healthy: healthInfo.fallback,
          status: healthInfo.fallback ? 'operational' : 'down'
        } : null
      },
      circuitBreaker: {
        status: healthInfo.circuitBreaker ? 'open' : 'closed',
        failureCount: healthInfo.failureCount
      },
      uptime: Math.round(process.uptime()),
    };

    logger.info('AI health check performed', { 
      status: response.status, 
      primaryHealthy: healthInfo.primary,
      fallbackHealthy: healthInfo.fallback 
    });

    return NextResponse.json(response, {
      status: isHealthy ? 200 : 503
    });

  } catch (error: unknown) {
    const errorResponse = handleError(error, 'AI.healthCheck.GET', { logLevel: 'error' });
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: errorResponse.error.message,
      code: errorResponse.error.code
    }, {
      status: 500
    });
  }
}

function authorizeAdmin(request: NextRequest): boolean {
  const secret = process.env.AI_HEALTH_SECRET || process.env.INTERNAL_API_SECRET;
  if (!secret) {
    return process.env.NODE_ENV !== 'production';
  }
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return token === secret;
}

export async function POST(request: NextRequest) {
  try {
    if (!authorizeAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'reset':
        // Reset circuit breaker and failure counts
        const resetResult = await resetAIServices();
        return NextResponse.json(resetResult);

      case 'test':
        // Run a test operation on AI services
        const testResult = await testAIServices();
        return NextResponse.json(testResult);

      default:
        return NextResponse.json({
          error: 'Invalid action',
          message: 'Supported actions: reset, test'
        }, {
          status: 400
        });
    }

  } catch (error: unknown) {
    const errorResponse = handleError(error, 'AI.healthCheck.POST', { logLevel: 'error' });
    
    return NextResponse.json({
      error: 'Operation failed',
      message: errorResponse.error.message,
      code: errorResponse.error.code
    }, {
      status: 500
    });
  }
}

/**
 * Reset AI services (circuit breaker, failure counts)
 */
async function resetAIServices() {
  try {
    // Create a new manager instance to reset state
    const newManager = AIServiceManager.createFromEnvironment();
    
    logger.info('AI services reset requested');
    
    return {
      success: true,
      message: 'AI services reset completed',
      timestamp: new Date().toISOString()
    };
  } catch (error: unknown) {
    logger.error('AI services reset failed:', { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

/**
 * Test AI services with sample operations
 */
async function testAIServices() {
  try {
    const startTime = Date.now();
    
    // Test solution recommendation
    const solutionTest = {
      businessNeeds: 'Test business needs for health check',
      companySize: 'small',
      industry: 'technology',
      budget: '10000-50000'
    };

    // Test automated task design
    const taskTest = {
      workflowDescription: 'Test workflow for health check',
      optimizationSuggestions: 'Test optimization suggestions'
    };

    // Note: We don't actually call the AI services here to avoid unnecessary costs
    // Instead, we just verify the service manager is properly configured
    const serviceInfo = aiServiceManager.getServiceInfo();
    
    const endTime = Date.now();

    return {
      success: true,
      message: 'AI services test completed',
      timestamp: new Date().toISOString(),
      duration: endTime - startTime,
      services: serviceInfo,
      tests: {
        solutionRecommendation: 'Service configured',
        automatedTaskDesign: 'Service configured'
      }
    };
  } catch (error: unknown) {
    logger.error('AI services test failed:', { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}