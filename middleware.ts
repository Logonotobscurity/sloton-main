import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_HEADERS, SECURITY_CONSTANTS, RateLimiter, validateRequest } from '@/lib/security';

// Initialize rate limiter
const rateLimiter = new RateLimiter();

export async function middleware(request: NextRequest) {
  // Apply rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous';
    const now = Date.now();
    const windowStart = now - SECURITY_CONSTANTS.RATE_LIMIT.WINDOW;
    
    // Clean up old entries
    const currentWindow = rateLimiter.get(ip);
    if (currentWindow && currentWindow.timestamp < windowStart) {
      rateLimiter.delete(ip);
    }
    
    // Check rate limit
    const current = rateLimiter.get(ip) ?? { count: 0, timestamp: now };
    if (current.count >= SECURITY_CONSTANTS.RATE_LIMIT.MAX_REQUESTS) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
    
    // Update rate limit counter
    rateLimiter.set(ip, {
      count: current.count + 1,
      timestamp: now,
    });
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}