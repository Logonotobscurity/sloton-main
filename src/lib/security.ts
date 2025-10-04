import crypto from 'crypto';
import { getConfig } from '@/config';

// Security Constants (now loaded from config)
export const SECURITY_CONSTANTS = {
  RATE_LIMIT: {
    WINDOW: getConfig().security.rateLimitWindow,
    MAX_REQUESTS: getConfig().security.rateLimitMaxRequests,
  },
  JWT: {
    EXPIRY: getConfig().security.jwtExpiry,
    REFRESH_EXPIRY: getConfig().security.jwtRefreshExpiry,
  },
  CSRF: {
    COOKIE_NAME: getConfig().security.csrfCookieName,
    HEADER_NAME: getConfig().security.csrfHeaderName,
  }
};

// Security Headers Configuration
export const SECURITY_HEADERS = {
  default: {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Content-Security-Policy': getCSPPolicy(),
  },
  api: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  }
};

// Generate CSP Policy
function getCSPPolicy() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.logonsolutions.netlify.app https://*.vercel.app",
    "media-src 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join('; ');
}

// CSRF Protection
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Rate Limiting
export class RateLimiter {
  private store: Map<string, { count: number; timestamp: number }>;
  private cleanupInterval: ReturnType<typeof setInterval>;

  constructor() {
    this.store = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), SECURITY_CONSTANTS.RATE_LIMIT.WINDOW);
  }

  get(key: string): { count: number; timestamp: number } | undefined {
    return this.store.get(key);
  }

  set(key: string, data: { count: number; timestamp: number }): void {
    this.store.set(key, data);
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  check(key: string): boolean {
    const now = Date.now();
    const windowStart = now - SECURITY_CONSTANTS.RATE_LIMIT.WINDOW;
    
    // Clean up old entry if exists
    const current = this.store.get(key);
    if (current && current.timestamp < windowStart) {
      this.store.delete(key);
    }
    
    // Get current or create new entry
    const entry = this.store.get(key) ?? { count: 0, timestamp: now };
    
    // Check if limit exceeded
    if (entry.count >= SECURITY_CONSTANTS.RATE_LIMIT.MAX_REQUESTS) {
      return false;
    }
    
    // Update counter
    this.store.set(key, {
      count: entry.count + 1,
      timestamp: now,
    });
    
    return true;
  }

  private cleanup() {
    const now = Date.now();
    const windowStart = now - SECURITY_CONSTANTS.RATE_LIMIT.WINDOW;
    
    for (const [key, value] of this.store.entries()) {
      if (value.timestamp < windowStart) {
        this.store.delete(key);
      }
    }
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Request Validation
export function validateRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Check for missing origin/referer in cross-origin requests
  if (request.mode === 'cors' && !origin && !referer) {
    return false;
  }
  
  // Add more validation as needed
  return true;
}

// Sanitize Input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char] || char));
}