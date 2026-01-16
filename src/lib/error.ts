/**
 * Error Handling Utilities
 * 
 * Note: This module provides core error handling without UI dependencies.
 * For toast notifications, use the error-handler.ts utility which provides
 * a more comprehensive error handling solution.
 * 
 * @deprecated Consider using @/lib/error-handler.ts instead for new code
 */

// Error types
export interface AppError extends Error {
  code?: keyof typeof ErrorCodes;
  status?: number;
  data?: unknown;
}

// Error codes
export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

// Toast function type for dependency injection
type ToastFunction = (options: { title: string; description: string; variant: string }) => void;

// Optional toast function - set by UI layer
let toastFn: ToastFunction | null = null;

/**
 * Set the toast function from the UI layer
 * This should be called once during app initialization
 */
export function setToastFunction(fn: ToastFunction) {
  toastFn = fn;
}

// Error handlers
export function handleError(error: unknown, options?: { silent?: boolean }): AppError {
  const appError = normalizeError(error);
  
  if (!options?.silent) {
    showErrorToast(appError);
  }
  
  // Log error to monitoring service
  logError(appError);
  
  return appError;
}

// Convert unknown error to AppError
function normalizeError(error: unknown): AppError {
  if (error instanceof Error) {
    const appError = error as Partial<AppError>;
    return {
      ...error,
      code: appError.code,
      status: appError.status,
      data: appError.data
    } as AppError;
  }
  
  if (typeof error === 'string') {
    const appError = new Error(error);
    return { ...appError } as AppError;
  }
  
  const appError = new Error('An unknown error occurred');
  return { ...appError } as AppError;
}

// Show error toast
function showErrorToast(error: AppError) {
  if (toastFn) {
    toastFn({
      title: getErrorTitle(error),
      description: error.message,
      variant: 'destructive',
    });
  } else {
    // Fallback to console if toast not configured
    console.warn('[Error Toast]:', getErrorTitle(error), error.message);
  }
}

// Get user-friendly error title
function getErrorTitle(error: AppError): string {
  switch (error.code) {
    case ErrorCodes.NETWORK_ERROR:
      return 'Network Error';
    case ErrorCodes.VALIDATION_ERROR:
      return 'Validation Error';
    case ErrorCodes.AUTH_ERROR:
      return 'Authentication Error';
    case ErrorCodes.NOT_FOUND:
      return 'Not Found';
    case ErrorCodes.SERVER_ERROR:
      return 'Server Error';
    default:
      return 'Error';
  }
}

// Log error to monitoring service
function logError(error: AppError) {
  // TODO: Implement error logging service
  const errorLog: Record<string, unknown> = {
    message: error.message,
    code: error.code,
    status: error.status,
    stack: error.stack,
    data: error.data,
  };
  console.error('[Error]:', errorLog);
}

// Create typed error
export function createError(message: string, code: keyof typeof ErrorCodes, status?: number, data?: unknown): AppError {
  const error = new Error(message) as AppError;
  error.code = code;
  error.status = status;
  error.data = data;
  return error;
}

// Async error boundary HOC
export async function withErrorBoundary<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    throw handleError(error);
  }
}