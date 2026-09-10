/**
 * Distributed Rate Limiter using Upstash Redis
 * Replaces in-memory rate limiting that was per-isolate on serverless
 */

import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

/**
 * Initialize Redis client (lazy-loaded)
 */
function getRedisClient(): Redis {
  if (redis) return redis;
  
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    console.warn(
      '[RateLimit] Upstash Redis not configured. Rate limiting will not be enforced. ' +
      'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable distributed rate limiting.'
    );
  }
  
  redis = new Redis({
    url: url || 'https://default.upstash.io',
    token: token || 'default-token',
  });
  
  return redis;
}

export interface RateLimitConfig {
  max: number;      // Max requests allowed
  windowMs: number; // Time window in milliseconds
  keyPrefix?: string;
}

/**
 * Check if a request is within rate limit
 * Returns { success: boolean, remaining: number, resetAt: number }
 */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<{
  success: boolean;
  remaining: number;
  resetAt: number;
}> {
  try {
    const client = getRedisClient();
    const prefixedKey = `ratelimit:${config.keyPrefix || 'default'}:${key}`;
    const now = Date.now();
    
    // Use Redis INCR with TTL
    const current = await client.incr(prefixedKey);
    
    if (current === 1) {
      // First request in window; set expiration
      const windowSeconds = Math.ceil(config.windowMs / 1000);
      await client.expire(prefixedKey, windowSeconds);
    }
    
    // Get TTL to calculate reset time
    const ttl = await client.ttl(prefixedKey);
    const resetAt = now + (ttl > 0 ? ttl * 1000 : config.windowMs);
    
    const remaining = Math.max(0, config.max - current);
    const success = current <= config.max;
    
    return { success, remaining, resetAt };
  } catch (error) {
    // Fail open on Redis error (allow request to proceed)
    console.error('[RateLimit] Redis error:', error);
    return {
      success: true,
      remaining: config.max,
      resetAt: Date.now() + config.windowMs,
    };
  }
}

/**
 * Reset a rate limit key (admin use)
 */
export async function resetRateLimit(key: string, keyPrefix?: string): Promise<void> {
  try {
    const client = getRedisClient();
    const prefixedKey = `ratelimit:${keyPrefix || 'default'}:${key}`;
    await client.del(prefixedKey);
  } catch (error) {
    console.error('[RateLimit] Failed to reset key:', error);
  }
}

/**
 * Get current rate limit status (for debugging)
 */
export async function getRateLimitStatus(
  key: string,
  config: RateLimitConfig
): Promise<{ current: number; remaining: number } | null> {
  try {
    const client = getRedisClient();
    const prefixedKey = `ratelimit:${config.keyPrefix || 'default'}:${key}`;
    const current = await client.get(prefixedKey) as number | null;
    
    if (current === null) {
      return { current: 0, remaining: config.max };
    }
    
    return {
      current,
      remaining: Math.max(0, config.max - current),
    };
  } catch (error) {
    console.error('[RateLimit] Failed to get status:', error);
    return null;
  }
}
