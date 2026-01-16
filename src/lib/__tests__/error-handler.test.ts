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
} from '../error-handler';

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
      const result = handleError(appError);
      expect(result.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(result.message).toBe('Test error');
    });

    it('should handle standard Error', () => {
      const error = new Error('Standard error');
      const result = handleError(error);
      expect(result.code).toBe(ErrorCode.UNKNOWN_ERROR);
      expect(result.message).toBe('Standard error');
    });

    it('should handle string error', () => {
      const result = handleError('String error');
      expect(result.message).toBe('String error');
    });

    it('should handle unknown error', () => {
      const result = handleError({ unknown: 'object' });
      expect(result.code).toBe(ErrorCode.UNKNOWN_ERROR);
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response from AppError', () => {
      const error = new AppError('Test error', ErrorCode.VALIDATION_ERROR, 400);
      const response = createErrorResponse(error);
      expect(response.status).toBe(400);
    });
  });

  describe('createSuccessResponse', () => {
    it('should create success response with data', () => {
      const data = { id: 1, name: 'Test' };
      const response = createSuccessResponse(data);
      expect(response.status).toBe(200);
    });

    it('should create success response with custom status', () => {
      const response = createSuccessResponse({ created: true }, 201);
      expect(response.status).toBe(201);
    });
  });

  describe('withErrorHandling', () => {
    it('should return result on success', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const wrapped = withErrorHandling(fn);
      const result = await wrapped();
      expect(result).toBe('success');
    });

    it('should handle errors', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Failed'));
      const wrapped = withErrorHandling(fn);
      await expect(wrapped()).rejects.toThrow();
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
      ).rejects.toThrow('Always fails');
      expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
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
    it('should return valid for complete object', () => {
      const obj = { name: 'Test', email: 'test@example.com' };
      const result = validateRequiredFields(obj, ['name', 'email']);
      expect(result.valid).toBe(true);
      expect(result.missingFields).toHaveLength(0);
    });

    it('should return invalid for missing fields', () => {
      const obj = { name: 'Test' };
      const result = validateRequiredFields(obj, ['name', 'email']);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('email');
    });

    it('should handle empty values as missing', () => {
      const obj = { name: '', email: 'test@example.com' };
      const result = validateRequiredFields(obj, ['name', 'email']);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('name');
    });
  });

  describe('isErrorResponse', () => {
    it('should return true for error response', () => {
      const response = { success: false, error: { code: 'ERROR', message: 'Failed' } };
      expect(isErrorResponse(response)).toBe(true);
    });

    it('should return false for success response', () => {
      const response = { success: true, data: {} };
      expect(isErrorResponse(response)).toBe(false);
    });
  });

  describe('isSuccessResponse', () => {
    it('should return true for success response', () => {
      const response = { success: true, data: {} };
      expect(isSuccessResponse(response)).toBe(true);
    });

    it('should return false for error response', () => {
      const response = { success: false, error: { code: 'ERROR', message: 'Failed' } };
      expect(isSuccessResponse(response)).toBe(false);
    });
  });
});
