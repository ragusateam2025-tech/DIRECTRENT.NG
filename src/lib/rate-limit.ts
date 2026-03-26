/**
 * Simple in-memory rate limiter.
 * Works for single-server deployment on Vercel serverless.
 *
 * TODO: Replace with @upstash/ratelimit for production scale
 * when Upstash Redis is configured.
 */
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}
