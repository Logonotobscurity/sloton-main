# AI Service Dependency Injection System

This document describes the new AI service dependency injection system that replaces the direct coupling between components and AI flows.

## Overview

The AI dependency injection system provides a flexible, testable, and maintainable way to integrate AI services throughout the application. It supports multiple AI providers, automatic fallbacks, and comprehensive error handling.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │───▶│  Action Layer    │───▶│ AI Service Mgr  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                       │
                              ┌──────────────────────┼──────────────────────┐
                              │                      │                      │
                       ┌──────▼──────┐       ┌─────▼─────┐         ┌──────▼──────┐
                       │ Google AI   │       │ Fallback  │         │    Mock     │
                       │  Service    │       │ Provider  │         │  Service    │
                       └─────────────┘       └───────────┘         └─────────────┘
```

## Key Components

### 1. AI Service Interface (`ai-service.interface.ts`)
Defines the contract that all AI service providers must implement:

```typescript
interface IAIService {
  getSolutionRecommendation(input: SolutionRecommendationInput): Promise<SolutionRecommendationOutput>;
  getAutomatedTaskDesign(input: AutomateTaskDesignInput): Promise<AutomateTaskDesignOutput>;
  healthCheck(): Promise<boolean>;
  getProviderName(): string;
}
```

### 2. AI Service Factory (`ai-service-factory.ts`)
Creates and manages AI service instances:

```typescript
const service = AIServiceFactory.getService({
  provider: AIProvider.GOOGLE_AI,
  timeout: 30000,
  retryAttempts: 3
});
```

### 3. AI Service Manager (`ai-service-manager.ts`)
Provides centralized management with error handling, fallbacks, and circuit breakers.

### 4. Configuration System (`ai-config.ts`)
Environment-based configuration with validation and defaults.

## Usage

### Basic Usage in Components

```typescript
import { getSolutionRecommendation } from '@/app/actions';

// The action automatically uses the configured AI service
const result = await getSolutionRecommendation({
  businessNeeds: 'Automate customer support',
  companySize: 'medium',
  industry: 'e-commerce',
  budget: '25000-50000'
});
```

### Configuration

Set environment variables to configure the AI services:

```bash
# AI Provider Configuration
AI_PROVIDER=google-ai
AI_FALLBACK_PROVIDER=mock
AI_TIMEOUT=30000
AI_RETRY_ATTEMPTS=3

# Circuit Breaker Configuration
AI_CIRCUIT_BREAKER_ENABLED=true
AI_CIRCUIT_BREAKER_THRESHOLD=5
AI_CIRCUIT_BREAKER_TIMEOUT=60000

# Logging Configuration
AI_LOGGING_ENABLED=true
AI_LOG_LEVEL=info
```

### Environment-Specific Configurations

The system automatically applies different configurations based on the environment:

- **Development**: Uses Google AI with Mock fallback, debug logging
- **Staging**: Uses Google AI with longer timeouts, info logging
- **Production**: Uses Google AI with circuit breakers, warn logging

## Features

### 1. Multiple AI Providers
- **Google AI (Gemini)**: Primary provider using Genkit
- **Mock Service**: For development and testing
- **Extensible**: Easy to add OpenAI, Anthropic, etc.

### 2. Error Handling & Fallbacks
- Automatic retry with exponential backoff
- Fallback to secondary providers
- Circuit breaker pattern to prevent cascading failures
- Comprehensive error logging

### 3. Health Monitoring
- Built-in health check endpoint: `/api/ai/health`
- Service status monitoring
- Failure tracking and alerting

### 4. Testing Support
- Mock service for unit tests
- Configurable providers for different test scenarios
- No external dependencies in test environment

## Benefits

### 1. Testability
```typescript
// Easy to test with mock services
const mockService = AIServiceFactory.getService({ provider: AIProvider.MOCK });
const result = await mockService.getSolutionRecommendation(testInput);
```

### 2. Configurability
- Switch providers without code changes
- Environment-specific settings
- Runtime configuration updates

### 3. Reliability
- Automatic fallbacks prevent service outages
- Circuit breakers protect against cascading failures
- Comprehensive error handling and logging

### 4. Maintainability
- Clean separation of concerns
- Centralized service management
- Easy to add new providers

## Migration Guide

### From Direct AI Flow Usage

**Before:**
```typescript
import { solutionRecommendation } from '@/ai/flows/solution-recommendation';
const result = await solutionRecommendation(input);
```

**After:**
```typescript
import { getSolutionRecommendation } from '@/app/actions';
const result = await getSolutionRecommendation(input);
```

### No Code Changes Required
The existing `getSolutionRecommendation` and `getAutomatedTaskDesign` actions have been updated to use the new dependency injection system automatically.

## API Reference

### Actions
- `getSolutionRecommendation(input)`: Generate solution recommendations
- `getAutomatedTaskDesign(input)`: Design automated task workflows

### Health Check API
- `GET /api/ai/health`: Get service health status
- `POST /api/ai/health`: Reset services or run tests

### Configuration
See `ai-config.ts` for all available configuration options.

## Best Practices

1. **Always use the action layer** - Don't call AI services directly from components
2. **Handle errors gracefully** - The system provides good error messages
3. **Monitor health status** - Use the health check API for monitoring
4. **Use appropriate timeouts** - Configure based on your needs
5. **Test with mock services** - Use the mock provider for testing

## Troubleshooting

### Common Issues

1. **Service Timeouts**
   - Increase `AI_TIMEOUT` environment variable
   - Check network connectivity
   - Monitor service health status

2. **Circuit Breaker Open**
   - Check service health at `/api/ai/health`
   - Reset circuit breaker via POST to health endpoint
   - Investigate underlying service issues

3. **Fallback Not Working**
   - Ensure `AI_FALLBACK_PROVIDER` is configured
   - Check fallback service configuration
   - Verify fallback service health

### Debug Mode
Set `AI_LOG_LEVEL=debug` and `AI_LOGGING_ENABLED=true` for detailed logging.

## Future Enhancements

- OpenAI and Anthropic provider implementations
- Performance metrics and analytics
- Rate limiting and quota management
- Advanced circuit breaker strategies
- Service mesh integration