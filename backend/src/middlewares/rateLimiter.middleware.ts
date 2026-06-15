import redis from '@/utils/redis'
import rateLimit from "express-rate-limit"
import RedisStore from "rate-limit-redis"

export const createRateLimiter = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => (redis.call as any)(...args),
    }),
    windowMs,
    max,
    message: message || "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  })
}

export const authRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  50, // limit each IP to 5 requests per windowMs
  "Too many authentication attempts, please try again later.",
)

export const generalRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
)
