/**
 * Date Utils Tests
 * Unit tests for date formatting utilities
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  formatDate,
  formatFullDate,
  formatShortDate,
  formatNumericDate,
  formatMonthYear,
  formatISODate,
  formatRelativeTime,
  formatDateTime,
  formatTime,
  formatDateRange,
  isToday,
  isPast,
  isFuture,
  getDaysDifference,
  DateFormat,
} from '../date-utils';

describe('date-utils', () => {
  // Use a fixed date for consistent testing
  const fixedDate = new Date('2026-01-15T12:00:00Z');
  const yesterday = new Date('2026-01-14T12:00:00Z');
  const tomorrow = new Date('2026-01-16T12:00:00Z');
  const lastWeek = new Date('2026-01-08T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatDate', () => {
    it('should format date with FULL format', () => {
      const result = formatDate(fixedDate, DateFormat.FULL);
      expect(result).toBe('January 15, 2026');
    });

    it('should format date with SHORT format', () => {
      const result = formatDate(fixedDate, DateFormat.SHORT);
      expect(result).toBe('Jan 15, 2026');
    });

    it('should format date with NUMERIC format', () => {
      const result = formatDate(fixedDate, DateFormat.NUMERIC);
      expect(result).toMatch(/1\/15\/2026|01\/15\/2026/);
    });

    it('should format date with MONTH_YEAR format', () => {
      const result = formatDate(fixedDate, DateFormat.MONTH_YEAR);
      expect(result).toBe('January 2026');
    });

    it('should format date with ISO format', () => {
      const result = formatDate(fixedDate, DateFormat.ISO);
      expect(result).toBe('2026-01-15');
    });

    it('should handle string date input', () => {
      const result = formatDate('2026-01-15', DateFormat.FULL);
      expect(result).toBe('January 15, 2026');
    });

    it('should handle invalid date', () => {
      const result = formatDate('invalid-date', DateFormat.FULL);
      expect(result).toBe('Invalid Date');
    });
  });

  describe('formatFullDate', () => {
    it('should format date as full date', () => {
      expect(formatFullDate(fixedDate)).toBe('January 15, 2026');
    });
  });

  describe('formatShortDate', () => {
    it('should format date as short date', () => {
      expect(formatShortDate(fixedDate)).toBe('Jan 15, 2026');
    });
  });

  describe('formatNumericDate', () => {
    it('should format date as numeric', () => {
      const result = formatNumericDate(fixedDate);
      expect(result).toMatch(/1\/15\/2026|01\/15\/2026/);
    });
  });

  describe('formatMonthYear', () => {
    it('should format date as month and year', () => {
      expect(formatMonthYear(fixedDate)).toBe('January 2026');
    });
  });

  describe('formatISODate', () => {
    it('should format date as ISO string', () => {
      expect(formatISODate(fixedDate)).toBe('2026-01-15');
    });
  });

  describe('formatRelativeTime', () => {
    it('should format "today" for same day', () => {
      const result = formatRelativeTime(fixedDate);
      expect(result.toLowerCase()).toContain('today');
    });

    it('should format "yesterday" for previous day', () => {
      const result = formatRelativeTime(yesterday);
      expect(result.toLowerCase()).toContain('yesterday');
    });

    it('should format days ago for past dates', () => {
      const result = formatRelativeTime(lastWeek);
      expect(result).toMatch(/7 days ago|last week/i);
    });
  });

  describe('formatDateTime', () => {
    it('should format date with time', () => {
      const result = formatDateTime(fixedDate);
      expect(result).toContain('January 15, 2026');
      expect(result).toMatch(/12:00|noon/i);
    });
  });

  describe('formatTime', () => {
    it('should format time only', () => {
      const result = formatTime(fixedDate);
      expect(result).toMatch(/12:00|noon/i);
    });
  });

  describe('formatDateRange', () => {
    it('should format date range', () => {
      const result = formatDateRange(yesterday, tomorrow);
      expect(result).toContain('Jan 14');
      expect(result).toContain('Jan 16');
    });

    it('should handle same day range', () => {
      const result = formatDateRange(fixedDate, fixedDate);
      expect(result).toContain('Jan 15');
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      expect(isToday(fixedDate)).toBe(true);
    });

    it('should return false for yesterday', () => {
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('isPast', () => {
    it('should return true for past dates', () => {
      expect(isPast(yesterday)).toBe(true);
    });

    it('should return false for future dates', () => {
      expect(isPast(tomorrow)).toBe(false);
    });
  });

  describe('isFuture', () => {
    it('should return true for future dates', () => {
      expect(isFuture(tomorrow)).toBe(true);
    });

    it('should return false for past dates', () => {
      expect(isFuture(yesterday)).toBe(false);
    });
  });

  describe('getDaysDifference', () => {
    it('should return 0 for same day', () => {
      expect(getDaysDifference(fixedDate, fixedDate)).toBe(0);
    });

    it('should return positive for future dates', () => {
      expect(getDaysDifference(fixedDate, tomorrow)).toBe(1);
    });

    it('should return negative for past dates', () => {
      expect(getDaysDifference(fixedDate, yesterday)).toBe(-1);
    });

    it('should calculate week difference', () => {
      expect(getDaysDifference(lastWeek, fixedDate)).toBe(7);
    });
  });
});
