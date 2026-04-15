/**
 * Date Formatting Utilities
 * Centralized date formatting functions for consistent date display across the application
 */

import { logger } from '@/lib/logger';

/**
 * Standard date format options
 */
export const DateFormats = {
  /**
   * Full date: "January 15, 2026"
   */
  FULL: {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
  },

  /**
   * Short date: "Jan 15, 2026"
   */
  SHORT: {
    year: 'numeric' as const,
    month: 'short' as const,
    day: 'numeric' as const,
  },

  /**
   * Numeric date: "01/15/2026"
   */
  NUMERIC: {
    year: 'numeric' as const,
    month: '2-digit' as const,
    day: '2-digit' as const,
  },

  /**
   * Month and year: "January 2026"
   */
  MONTH_YEAR: {
    year: 'numeric' as const,
    month: 'long' as const,
  },

  /**
   * ISO date: "2026-01-15"
   */
  ISO: 'iso' as const,

  /**
   * Relative time: "2 days ago", "in 3 hours"
   */
  RELATIVE: 'relative' as const,
} as const;

/**
 * Default locale for date formatting
 */
const DEFAULT_LOCALE = 'en-US';

/**
 * Format a date using the specified format
 */
export function formatDate(
  date: Date | string | number,
  format: keyof typeof DateFormats = 'FULL',
  locale: string = DEFAULT_LOCALE
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    logger.warn('Invalid date provided to formatDate', { date });
    return 'Invalid Date';
  }

  const formatOptions = DateFormats[format];

  // Handle special formats
  if (formatOptions === 'iso') {
    return dateObj.toISOString().split('T')[0];
  }

  if (formatOptions === 'relative') {
    return formatRelativeTime(dateObj);
  }

  // Use Intl.DateTimeFormat for standard formats
  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
}

/**
 * Format date as "January 15, 2026"
 */
export function formatFullDate(date: Date | string | number, locale?: string): string {
  return formatDate(date, 'FULL', locale);
}

/**
 * Format date as "Jan 15, 2026"
 */
export function formatShortDate(date: Date | string | number, locale?: string): string {
  return formatDate(date, 'SHORT', locale);
}

/**
 * Format date as "01/15/2026"
 */
export function formatNumericDate(date: Date | string | number, locale?: string): string {
  return formatDate(date, 'NUMERIC', locale);
}

/**
 * Format date as "January 2026"
 */
export function formatMonthYear(date: Date | string | number, locale?: string): string {
  return formatDate(date, 'MONTH_YEAR', locale);
}

/**
 * Format date as ISO string "2026-01-15"
 */
export function formatISODate(date: Date | string | number): string {
  return formatDate(date, 'ISO');
}

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(date: Date | string | number, locale: string = DEFAULT_LOCALE): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, 'second');
  } else if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, 'minute');
  } else if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, 'hour');
  } else if (Math.abs(diffDay) < 7) {
    return rtf.format(diffDay, 'day');
  } else if (Math.abs(diffWeek) < 4) {
    return rtf.format(diffWeek, 'week');
  } else if (Math.abs(diffMonth) < 12) {
    return rtf.format(diffMonth, 'month');
  } else {
    return rtf.format(diffYear, 'year');
  }
}

/**
 * Format date with time (e.g., "January 15, 2026 at 3:45 PM")
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  includeSeconds: boolean = false
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' }),
  };

  const datePart = new Intl.DateTimeFormat(locale, dateOptions).format(dateObj);
  const timePart = new Intl.DateTimeFormat(locale, timeOptions).format(dateObj);

  return `${datePart} at ${timePart}`;
}

/**
 * Format time only (e.g., "3:45 PM")
 */
export function formatTime(
  date: Date | string | number,
  locale: string = DEFAULT_LOCALE,
  includeSeconds: boolean = false
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Time';
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' }),
  };

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
}

/**
 * Get the difference between two dates in days
 */
export function getDaysDifference(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' || typeof date2 === 'number' ? new Date(date2) : date2;

  const diffMs = d2.getTime() - d1.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Parse a date string safely
 */
export function parseDate(dateString: string): Date | null {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

/**
 * Format a date range (e.g., "Jan 15 - Jan 20, 2026")
 */
export function formatDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
  locale: string = DEFAULT_LOCALE
): string {
  const start = typeof startDate === 'string' || typeof startDate === 'number' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' || typeof endDate === 'number' ? new Date(endDate) : endDate;

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date Range';
  }

  // Same year
  if (start.getFullYear() === end.getFullYear()) {
    // Same month
    if (start.getMonth() === end.getMonth()) {
      const monthYear = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(start);
      return `${start.getDate()} - ${end.getDate()} ${monthYear}`;
    }
    // Different months, same year
    const startMonth = new Intl.DateTimeFormat(locale, { month: 'short' }).format(start);
    const endMonth = new Intl.DateTimeFormat(locale, { month: 'short' }).format(end);
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${start.getFullYear()}`;
  }

  // Different years
  return `${formatShortDate(start, locale)} - ${formatShortDate(end, locale)}`;
}
