import { headers } from 'next/headers';
import { RateLimiter } from '@/lib/security';
import { AppError, ErrorCode } from '@/lib/error-handler';

const actionLimiter = new RateLimiter();

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  ai: { max: 8, windowMs: 60_000 },
  form: { max: 12, windowMs: 60_000 },
};

/**
 * Per-IP rate limit for Server Actions (middleware only covers /api/*).
 */
export async function assertActionRateLimit(bucket: 'ai' | 'form'): Promise<void> {
  const h = await headers();
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    'anonymous';

  const key = `${bucket}:${ip}`;
  const limit = LIMITS[bucket];
  const now = Date.now();
  const current = actionLimiter.get(key);

  if (current && now - current.timestamp > limit.windowMs) {
    actionLimiter.delete(key);
  }

  const entry = actionLimiter.get(key) ?? { count: 0, timestamp: now };
  if (entry.count >= limit.max) {
    throw new AppError(
      'Too many requests. Please try again shortly.',
      ErrorCode.RATE_LIMIT_EXCEEDED,
      429
    );
  }

  actionLimiter.set(key, {
    count: entry.count + 1,
    timestamp: entry.timestamp || now,
  });
}

export function clientSafeMessage(error: unknown, fallback: string): string {
  if (error instanceof AppError && error.statusCode < 500) {
    return error.message;
  }
  return fallback;
}
