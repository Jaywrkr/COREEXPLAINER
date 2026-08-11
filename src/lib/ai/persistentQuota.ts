import { Redis } from "@upstash/redis";

const WINDOW_SECONDS = 10 * 60;
const WINDOW_MS = WINDOW_SECONDS * 1000;
const REQUEST_LIMIT = 20;

let client: Redis | null | undefined;

function redisClient(): Redis | null {
  if (client !== undefined) return client;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    client = null;
    return client;
  }
  client = Redis.fromEnv();
  return client;
}

function windowKey(now: number) { return Math.floor(now / WINDOW_MS); }
function retryAfter(now: number) { return Math.max(1, Math.ceil(((windowKey(now) + 1) * WINDOW_MS - now) / 1000)); }

/** Returns undefined when no shared store is configured or temporarily unavailable. */
export async function reservePersistentQuota(key: string, requestedTokens: number, tokenBudget: number, now = Date.now(), countRequest = true): Promise<{ allowed: true } | { allowed: false; retryAfter: number } | undefined> {
  const redis = redisClient();
  if (!redis) return undefined;
  const suffix = `${windowKey(now)}:${key}`;
  try {
    if (countRequest) {
      const requestKey = `coresolutions:ai:requests:${suffix}`;
      const requestCount = await redis.incr(requestKey);
      if (requestCount === 1) await redis.expire(requestKey, WINDOW_SECONDS);
      if (requestCount > REQUEST_LIMIT) return { allowed: false, retryAfter: retryAfter(now) };
    }

    const tokenKey = `coresolutions:ai:tokens:${suffix}`;
    const increment = Math.max(0, Math.ceil(requestedTokens));
    const reserved = await redis.incrby(tokenKey, increment);
    if (reserved === increment) await redis.expire(tokenKey, WINDOW_SECONDS);
    if (reserved > tokenBudget) {
      await redis.decrby(tokenKey, increment);
      return { allowed: false, retryAfter: retryAfter(now) };
    }
    return { allowed: true };
  } catch {
    return undefined;
  }
}
