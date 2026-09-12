import { createHash } from "node:crypto";

export const PIONEER_RATE_LIMIT = 5;
export const PIONEER_RATE_WINDOW_MS = 10 * 60 * 1000;
const KEY_PREFIX = "schoolkit:pioneer:rate:";

const SCRIPT = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("PTTL", KEYS[1])
return {count, ttl}
`.trim();

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
}

interface UpstashResponse {
  result?: [number, number];
  error?: string;
}

interface RateLimitEnvironment {
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  VERCEL_ENV?: string;
}

export class DistributedRateLimitError extends Error {}

export async function checkPioneerRateLimit(
  hashedClientKey: string,
  fetchImpl: typeof fetch = fetch,
  environment: RateLimitEnvironment = {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
): Promise<RateLimitResult> {
  const url = environment.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = environment.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new DistributedRateLimitError("Upstash rate limiter is not configured");

  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(["EVAL", SCRIPT, 1, `${KEY_PREFIX}${hashedClientKey}`, PIONEER_RATE_WINDOW_MS]),
      cache: "no-store",
    });
  } catch {
    throw new DistributedRateLimitError("Upstash rate limiter is unavailable");
  }

  if (!response.ok) throw new DistributedRateLimitError(`Upstash rate limiter returned ${response.status}`);
  const payload = await response.json() as UpstashResponse;
  if (payload.error || !Array.isArray(payload.result) || payload.result.length !== 2) {
    throw new DistributedRateLimitError("Upstash rate limiter returned an invalid response");
  }
  const [count, ttlMs] = payload.result.map(Number);
  if (!Number.isFinite(count) || !Number.isFinite(ttlMs)) {
    throw new DistributedRateLimitError("Upstash rate limiter returned invalid counters");
  }
  return {
    allowed: count <= PIONEER_RATE_LIMIT,
    retryAfter: count <= PIONEER_RATE_LIMIT ? 0 : Math.max(1, Math.ceil((ttlMs > 0 ? ttlMs : PIONEER_RATE_WINDOW_MS) / 1000)),
  };
}

export function isPreviewRateLimitProbe(
  headers: Headers,
  environment: Pick<RateLimitEnvironment, "VERCEL_ENV"> = { VERCEL_ENV: process.env.VERCEL_ENV },
): boolean {
  return environment.VERCEL_ENV === "preview" && !!headers.get("x-schoolkit-rate-limit-test-key")?.trim();
}

export function pioneerClientKey(
  headers: Headers,
  environment: Pick<RateLimitEnvironment, "VERCEL_ENV"> = { VERCEL_ENV: process.env.VERCEL_ENV },
): string {
  const probeKey = isPreviewRateLimitProbe(headers, environment)
    ? `preview-test:${headers.get("x-schoolkit-rate-limit-test-key")!.trim().slice(0, 128)}`
    : "";
  const forwarded = headers.get("x-vercel-forwarded-for") ?? headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim();
  const fallback = `${headers.get("user-agent") ?? "unknown"}|${headers.get("accept-language") ?? ""}`;
  return createHash("sha256").update(probeKey || ip || fallback).digest("hex");
}
