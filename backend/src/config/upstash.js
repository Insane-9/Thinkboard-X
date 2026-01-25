import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import dotenv from 'dotenv';

dotenv.config();

const redis = Redis.fromEnv()

await redis.set("foo", "bar");
await redis.get("foo");

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export { redis, ratelimit };