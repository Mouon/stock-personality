import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";
import { getStock } from "./stocks";
import type { EventType } from "./sharing";

export const eventTypes = ["share_attempt", "share_completed", "link_copied", "shared_link_visit"] as const;
export interface ShareEvent { type: EventType; stockId: string; eventId: string; interactionId?: string; }
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function parseEvent(value: unknown): ShareEvent | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return;
  const v = value as Record<string, unknown>;
  if (Object.keys(v).some(key => !["type", "stockId", "eventId", "interactionId"].includes(key))) return;
  if (!eventTypes.some(type => type === v.type) || !getStock(v.stockId) || typeof v.eventId !== "string" || !uuid.test(v.eventId)) return;
  if (v.type !== "shared_link_visit" && (typeof v.interactionId !== "string" || !uuid.test(v.interactionId))) return;
  if (v.interactionId !== undefined && (typeof v.interactionId !== "string" || !uuid.test(v.interactionId))) return;
  return v as unknown as ShareEvent;
}
export function getRedis(): Redis | undefined {
  const url = process.env.UPSTASH_REDIS_REST_URL; const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  return new Redis({ url, token });
}
export function secureEqual(a: string, b: string) { const x = Buffer.from(a); const y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); }
export function anonymousToken(raw: string | undefined): { id: string; cookie?: string } {
  const secret = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const sign = (id: string) => createHmac("sha256", secret).update(id).digest("hex");
  if (raw) { const [id, signature] = raw.split("."); if (uuid.test(id ?? "") && signature && secureEqual(signature, sign(id))) return { id }; }
  const id = randomUUID(); return { id, cookie: `${id}.${sign(id)}` };
}

// All deduplication, throttling and counter writes are atomic. No IP or user agent is stored.
export const recordScript = `
local dedup, rate, globalrate, visitorEvent, outcome, attempt, stats = unpack(KEYS)
local event, song = ARGV[1], ARGV[2]
if redis.call('EXISTS', dedup) == 1 then return 0 end
local n = redis.call('INCR', rate)
if n == 1 then redis.call('EXPIRE', rate, 60) end
if n > 20 then return -1 end
local g = redis.call('INCR', globalrate)
if g == 1 then redis.call('EXPIRE', globalrate, 60) end
if g > 600 then return -1 end
if redis.call('EXISTS', visitorEvent) == 1 then return 0 end
if event == 'share_completed' or event == 'link_copied' then
  if redis.call('EXISTS', attempt) == 0 then return -2 end
  if redis.call('EXISTS', outcome) == 1 then return 0 end
  redis.call('SET', outcome, '1', 'EX', 86400)
end
redis.call('SET', dedup, '1', 'EX', 86400)
redis.call('SET', visitorEvent, '1', 'EX', 60)
if event == 'share_attempt' then redis.call('SET', attempt, '1', 'EX', 86400) end
redis.call('HINCRBY', stats, event, 1)
redis.call('HINCRBY', 'human-equity:stock:' .. song, event, 1)
return 1
`;
export async function recordEvent(redis: Redis, event: ShareEvent, visitor: string) {
  const minute = Math.floor(Date.now() / 60000);
  const interaction = `${visitor}:${event.stockId}:${event.interactionId ?? "visit"}`;
  return redis.eval<string[], number>(recordScript, [
    `human-equity:dedup:${event.eventId}`, `human-equity:rate:${visitor}:${minute}`, `human-equity:global:${minute}`,
    `human-equity:visitor:${visitor}:${event.stockId}:${event.type}`, `human-equity:outcome:${interaction}`, `human-equity:attempt:${interaction}`, "human-equity:stats"
  ], [event.type, event.stockId, String(Date.now())]);
}
