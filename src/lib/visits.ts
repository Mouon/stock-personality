import type { Redis } from "@upstash/redis";

// Atomic, persistent browser-identity deduplication. No answers or IP addresses.
export const visitScript = `
local rate = redis.call('INCR', KEYS[3])
if rate == 1 then redis.call('EXPIRE', KEYS[3], 60) end
if rate > 120 then return -1 end
if redis.call('SETNX', KEYS[1], '1') == 1 then
  return redis.call('INCR', KEYS[2])
end
return tonumber(redis.call('GET', KEYS[2]) or '0')
`;
export async function recordVisit(redis: Redis, visitor: string) {
  return redis.eval<string[], number>(visitScript, [
    `human-equity:visits:seen:${visitor}`, "human-equity:visits:total",
    `human-equity:visits:rate:${Math.floor(Date.now() / 60000)}`
  ], []);
}
