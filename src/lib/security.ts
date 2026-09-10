import { getConfig } from '@/config';
import { getCSPPolicy } from '@/lib/csp';

// Security Constants (now loaded from config)
export const SECURITY_CONSTANTS = {
  RATE_LIMIT: {
    WINDOW: getConfig().security.rateLimitWindow,
    MAX_REQUESTS: getConfig().security.rateLimitMaxRequests,
  },
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
    'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  }
};




// Rate Limiting
export class RateLimiter {
  private store: Map<string, { count: number; timestamp: number }>;
  private cleanupInterval: ReturnType<typeof setInterval>;

  constructor() {
    this.store = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), SECURITY_CONSTANTS.RATE_LIMIT.WINDOW);
    
    // Register cleanup on shutdown
    if (typeof process !== 'undefined') {
      import('@/lib/shutdown').then(({ onShutdown }) => {
        onShutdown(() => this.destroy());
      });
    }
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