/**
 * Error Handler Tests
 * Unit tests for error handling utilities
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  AppError,
  ErrorCode,
  handleError,
  createErrorResponse,
  createSuccessResponse,
  withErrorHandling,
  retryWithBackoff,
  withTimeout,
  validateRequiredFields,
  isErrorResponse,
  isSuccessResponse,
  type ErrorResponse,
  type SuccessResponse,
} from '@/lib/error-handler';

describe('error-handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AppError', () => {
    it('should create an error with message and code', () => {
      const error = new AppError('Test error', ErrorCode.VALIDATION_ERROR);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(error.statusCode).toBe(500);
    });

    it('should create an error with custom status code', () => {
      const error = new AppError('Not found', ErrorCode.NOT_FOUND, 404);
      expect(error.statusCode).toBe(404);
    });

    it('should include details', () => {
      const details = { field: 'email', reason: 'invalid format' };
      const error = new AppError('Validation failed', ErrorCode.VALIDATION_ERROR, 400, details);
      expect(error.details).toEqual(details);
    });

    it('should be an instance of Error', () => {
      const error = new AppError('Test', ErrorCode.UNKNOWN_ERROR);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('handleError', () => {
    it('should handle AppError', () => {
      const appError = new AppError('Test error', ErrorCode.VALIDATION_ERROR, 400);
      const result = handleError(appError, 'test-context');
      expect(result.success).toBe(false);
      expect(result.error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(result.error.message).toBe('Test error');
    });

    it('should handle standard Error', () => {
      const error = new Error('Standard error');
      const result = handleError(error, 'test-context');
      expect(result.success).toBe(false);
      expect(result.error.code).toBe(ErrorCode.INTERNAL_ERROR);
      expect(result.error.message).toBe('Standard error');
    });

    it('should handle string error', () => {
      const result = handleError('String error', 'test-context');
      expect(result.success).toBe(false);
      expect(result.error.message).toBe('String error');
    });

    it('should handle unknown error', () => {
      const result = handleError({ unknown: 'object' }, 'test-context');
      expect(result.success).toBe(false);
      expect(result.error.code).toBe(ErrorCode.UNKNOWN_ERROR);
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response with message and code', () => {
      const response = createErrorResponse('Test error', ErrorCode.VALIDATION_ERROR);
      expect(response.success).toBe(false);
      expect(response.error.message).toBe('Test error');
      expect(response.error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(response.error.timestamp).toBeDefined();
    });

    it('should include details when provided', () => {
      const details = { field: 'email' };
      const response = createErrorResponse('Validation failed', ErrorCode.VALIDATION_ERROR, details);
      expect(response.error.details).toEqual(details);
    });
  });

  describe('createSuccessResponse', () => {
    it('should create success response with data', () => {
      const data = { id: 1, name: 'Test' };
      const response = createSuccessResponse(data);
      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.timestamp).toBeDefined();
    });
  });

  describe('withErrorHandling', () => {
    it('should return result on success', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const wrapped = withErrorHandling(fn, 'test-context');
      const result = await wrapped();
      expect(result).toBe('success');
    });

    it('should handle errors and return error response', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Failed'));
      const wrapped = withErrorHandling(fn, 'test-context');
      const result = await wrapped();
      expect(result).toHaveProperty('success', false);
      expect(result).toHaveProperty('error');
    });
  });

  describe('retryWithBackoff', () => {
    it('should return result on first success', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retryWithBackoff(fn, { maxRetries: 3 });
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockResolvedValue('success');
      
      const result = await retryWithBackoff(fn, { maxRetries: 3, initialDelay: 10 });
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should throw after max retries', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Always fails'));
      
      await expect(
        retryWithBackoff(fn, { maxRetries: 2, initialDelay: 10 })
      ).rejects.toThrow();
      expect(fn).toHaveBeenCalledTimes(2); // maxRetries attempts
    });
  });

  describe('withTimeout', () => {
    it('should return result before timeout', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await withTimeout(fn(), 1000);
      expect(result).toBe('success');
    });

    it('should throw on timeout', async () => {
      const slowPromise = new Promise((resolve) => setTimeout(resolve, 5000));
      
      await expect(
        withTimeout(slowPromise, 10)
      ).rejects.toThrow('Operation timed out');
    });
  });

  describe('validateRequiredFields', () => {
    it('should not throw for complete object', () => {
      const obj = { name: 'Test', email: 'test@example.com' };
      expect(() => validateRequiredFields(obj, ['name', 'email'])).not.toThrow();
    });

    it('should throw for missing fields', () => {
      const obj = { name: 'Test' } as { name: string; email?: string };
      expect(() => validateRequiredFields(obj, ['name', 'email'])).toThrow('Missing required fields: email');
    });

    it('should throw for empty values', () => {
      const obj = { name: '', email: 'test@example.com' };
      expect(() => validateRequiredFields(obj, ['name', 'email'])).toThrow('Missing required fields: name');
    });

    it('should throw for null values', () => {
      const obj = { name: null, email: 'test@example.com' } as { name: string | null; email: string };
      expect(() => validateRequiredFields(obj, ['name', 'email'])).toThrow('Missing required fields: name');
    });
  });

  describe('isErrorResponse', () => {
    it('should return true for error response', () => {
      const response: ErrorResponse = {
        success: false,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Failed',
          timestamp: new Date().toISOString()
        }
      };
      expect(isErrorResponse(response)).toBe(true);
    });

    it('should return false for success response', () => {
      const response: SuccessResponse<{}> = {
        success: true,
        data: {},
        timestamp: new Date().toISOString()
      };
      expect(isErrorResponse(response)).toBe(false);
    });
  });

  describe('isSuccessResponse', () => {
    it('should return true for success response', () => {
      const response: SuccessResponse<{}> = {
        success: true,
        data: {},
        timestamp: new Date().toISOString()
      };
      expect(isSuccessResponse(response)).toBe(true);
    });

    it('should return false for error response', () => {
      const response: ErrorResponse = {
        success: false,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Failed',
          timestamp: new Date().toISOString()
        }
      };
      expect(isSuccessResponse(response)).toBe(false);
    });
  });
});
