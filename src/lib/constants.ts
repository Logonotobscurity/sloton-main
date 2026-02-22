/**
 * Application Constants
 * Centralized constants to avoid magic numbers and duplicated values
 */

// Analytics
export const ANALYTICS = {
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX',
  MATOMO_SITE_ID: 1,
} as const;

// Timing Constants (in milliseconds)
export const TIMING = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

// Common Delays
export const DELAYS = {
  DEBOUNCE: 300,
  SHORT: 1000,
  MEDIUM: 2000,
  LONG: 3000,
  ANIMATION: 500,
} as const;

// Retry Configuration
export const RETRY = {
  MAX_ATTEMPTS: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 10000,
  BACKOFF_MULTIPLIER: 2,
} as const;

// Cache Durations
export const CACHE_DURATION = {
  STATIC: 24 * 60 * 60 * 1000, // 24 hours
  API: 5 * 60 * 1000, // 5 minutes
  IMAGES: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

// Service Worker
export const SERVICE_WORKER = {
  UPDATE_CHECK_INTERVAL: 60 * 60 * 1000, // 1 hour
} as const;

// Security
export const SECURITY = {
  HSTS_MAX_AGE: 63072000, // 2 years in seconds
} as const;

// Newsletter Popup
export const NEWSLETTER = {
  COOLDOWN_DAYS: 7,
  SHOW_DELAY: 5000, // 5 seconds
  SUCCESS_DISPLAY_DURATION: 2000, // 2 seconds
} as const;

// Toast Configuration
export const TOAST = {
  LIMIT: 1,
  REMOVE_DELAY: 1000000, // Very long delay for manual dismissal
} as const;

// Animation
export const ANIMATION = {
  HERO_SEQUENCE_DELAY: 2000,
  FPS: 60,
} as const;

// Viewport
export const VIEWPORT = {
  MAX_HEIGHT_MOBILE: 1000,
} as const;
