import { createHash } from "node:crypto";

export const PIONEER_RATE_LIMIT = 5;
export const PIONEER_RATE_WINDOW_MS = 10 * 60 * 1000;

type Entry = { count: number; resetAt: number };

export function createRateLimiter(limit = PIONEER_RATE_LIMIT, windowMs = PIONEER_RATE_WINDOW_MS) {
  const entries = new Map<string, Entry>();

  return (key: string, now = Date.now()): { allowed: boolean; retryAfter: number } => {
    if (entries.size >= 10_000) {
      for (const [storedKey, entry] of entries) {
        if (entry.resetAt <= now) entries.delete(storedKey);
      }
      if (entries.size >= 10_000) entries.delete(entries.keys().next().value as string);
    }
    const current = entries.get(key);
    if (!current || current.resetAt <= now) {
      entries.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfter: 0 };
    }
    if (current.count >= limit) {
      return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
    }
    current.count += 1;
    return { allowed: true, retryAfter: 0 };
  };
}

export function pioneerClientKey(headers: Headers): string {
  const forwarded = headers.get("x-vercel-forwarded-for") ?? headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim();
  const fallback = `${headers.get("user-agent") ?? "unknown"}|${headers.get("accept-language") ?? ""}`;
  return createHash("sha256").update(ip || fallback).digest("hex");
}

export const checkPioneerRateLimit = createRateLimiter();
