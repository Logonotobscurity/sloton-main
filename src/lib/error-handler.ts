/**
 * Centralized Error Handling Utility
 * Provides consistent error handling, logging, and formatting across the application
 */

import { logger } from '@/lib/logger';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
    timestamp: string;
  };
}

/**
 * Standard success response format
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  timestamp: string;
}

/**
 * Combined response type
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * Error codes for different error types
 */
export enum ErrorCode {
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // Authentication/Authorization errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',
  
  // Service errors
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // AI Service errors
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  AI_PROVIDER_ERROR = 'AI_PROVIDER_ERROR',
  AI_TIMEOUT = 'AI_TIMEOUT',
  AI_RATE_LIMIT = 'AI_RATE_LIMIT',
  
  // Generic errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
}

/**
 * Custom application error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: ErrorCode = ErrorCode.INTERNAL_ERROR,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error handler options
 */
export interface ErrorHandlerOptions {
  logError?: boolean;
  logLevel?: 'error' | 'warn' | 'info';
  includeStack?: boolean;
  rethrow?: boolean;
}

/**
 * Handle and format errors consistently
 */
export function handleError(
  error: unknown,
  context: string,
  options: ErrorHandlerOptions = {}
): ErrorResponse {
  const {
    logError = true,
    logLevel = 'error',
    includeStack = process.env.NODE_ENV === 'development',
    rethrow = false
  } = options;

  let errorMessage: string;
  let errorCode: ErrorCode;
  let errorDetails: unknown;

  // Parse error based on type
  if (error instanceof AppError) {
    errorMessage = error.message;
    errorCode = error.code;
    errorDetails = error.details;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorCode = ErrorCode.INTERNAL_ERROR;
    errorDetails = includeStack ? { stack: error.stack } : undefined;
  } else if (typeof error === 'string') {
    errorMessage = error;
    errorCode = ErrorCode.UNKNOWN_ERROR;
  } else {
    errorMessage = 'An unknown error occurred';
    errorCode = ErrorCode.UNKNOWN_ERROR;
    errorDetails = error;
  }

  // Log error if enabled
  if (logError) {
    const logMessage = `[${context}] ${errorMessage}`;
    const logData = {
      code: errorCode,
      details: errorDetails,
      context
    };

    switch (logLevel) {
      case 'error':
        logger.error(logMessage, logData);
        break;
      case 'warn':
        logger.warn(logMessage, logData);
        break;
      case 'info':
        logger.info(logMessage, logData);
        break;
    }
  }

  // Rethrow if requested
  if (rethrow) {
    throw error;
  }

  // Return formatted error response
  return {
    success: false,
    error: {
      message: errorMessage,
      code: errorCode,
      details: errorDetails,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Wrap async functions with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context: string,
  options?: ErrorHandlerOptions
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleError(error, context, options);
    }
  }) as T;
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
}

/**
 * Create an error response
 */
export function createErrorResponse(
  message: string,
  code: ErrorCode = ErrorCode.INTERNAL_ERROR,
  details?: unknown
): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      code,
      details,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Retry function with exponential backoff
 */
function isRetryableError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.code === ErrorCode.TIMEOUT || error.code === ErrorCode.SERVICE_UNAVAILABLE;
  }
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return /timeout|econnreset|429|503|unavailable|network|fetch failed/.test(message);
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    context?: string;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    context = 'retryWithBackoff',
    shouldRetry = isRetryableError,
  } = options;

  let lastError: Error;
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.info(`[${context}] Attempt ${attempt}/${maxRetries}`);
      return await fn();
    } catch (error) {
      lastError = error as Error;
      logger.warn(`[${context}] Attempt ${attempt} failed:`, {
        error: error instanceof Error ? error.message : String(error)
      });

      if (!shouldRetry(error)) {
        throw error;
      }

      if (attempt < maxRetries) {
        logger.info(`[${context}] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay = Math.min(delay * backoffMultiplier, maxDelay);
      }
    }
  }

  throw new AppError(
    `Failed after ${maxRetries} attempts: ${lastError!.message}`,
    ErrorCode.TIMEOUT,
    503,
    { originalError: lastError!.message }
  );
}

/**
 * Timeout wrapper for promises
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  context: string = 'withTimeout'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new AppError(
        `Operation timed out after ${timeoutMs}ms`,
        ErrorCode.TIMEOUT,
        408
      ));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } catch (error) {
    logger.error(`[${context}] Timeout or error occurred`, {
      error: error instanceof Error ? error.message : String(error),
      timeoutMs
    });
    throw error;
  }
}

/**
 * Safe JSON parse with error handling
 */
export function safeJsonParse<T = unknown>(
  json: string,
  fallback: T,
  context: string = 'safeJsonParse'
): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    logger.warn(`[${context}] Failed to parse JSON, using fallback`, {
      error: error instanceof Error ? error.message : String(error)
    });
    return fallback;
  }
}

/**
 * Validate required fields
 */
export function validateRequiredFields<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[],
  context: string = 'validateRequiredFields'
): void {
  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(', ')}`,
      ErrorCode.MISSING_REQUIRED_FIELD,
      400,
      { missingFields, context }
    );
  }
}

/**
 * Check if response is an error
 */
export function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  return response.success === false;
}

/**
 * Check if response is successful
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): response is SuccessResponse<T> {
  return response.success === true;
}
