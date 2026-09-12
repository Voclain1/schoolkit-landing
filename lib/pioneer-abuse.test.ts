import assert from "node:assert/strict";
import test from "node:test";
import { checkPioneerRateLimit, DistributedRateLimitError, isPreviewRateLimitProbe, PIONEER_RATE_WINDOW_MS, pioneerClientKey } from "./pioneer-abuse.ts";

const environment = { UPSTASH_REDIS_REST_URL: "https://redis.example", UPSTASH_REDIS_REST_TOKEN: "test-token" };

test("distributed limiter sends an atomic, expiring Redis script with a hashed key", async () => {
  let request: { url?: string; init?: RequestInit } = {};
  const mockFetch = (async (url: string | URL | Request, init?: RequestInit) => {
    request = { url: String(url), init };
    return Response.json({ result: [1, PIONEER_RATE_WINDOW_MS] });
  }) as typeof fetch;
  assert.deepEqual(await checkPioneerRateLimit("abc123", mockFetch, environment), { allowed: true, retryAfter: 0 });
  assert.equal(request.url, "https://redis.example");
  const command = JSON.parse(String(request.init?.body)) as unknown[];
  assert.equal(command[0], "EVAL");
  assert.match(String(command[1]), /INCR/);
  assert.match(String(command[1]), /PEXPIRE/);
  assert.equal(command[2], 1);
  assert.equal(command[3], "schoolkit:pioneer:rate:abc123");
  assert.equal(command[4], PIONEER_RATE_WINDOW_MS);
  assert.equal((request.init?.headers as Record<string, string>).authorization, "Bearer test-token");
});

test("distributed limiter strictly rejects the sixth valid attempt with Retry-After", async () => {
  const mockFetch = (async () => Response.json({ result: [6, 359_001] })) as typeof fetch;
  assert.deepEqual(await checkPioneerRateLimit("abc123", mockFetch, environment), { allowed: false, retryAfter: 360 });
});

test("distributed limiter fails closed when configuration or Redis is unavailable", async () => {
  await assert.rejects(() => checkPioneerRateLimit("abc123", fetch, {}), DistributedRateLimitError);
  const failingFetch = (async () => { throw new Error("offline"); }) as typeof fetch;
  await assert.rejects(() => checkPioneerRateLimit("abc123", failingFetch, environment), DistributedRateLimitError);
});

test("client keys are hashed and use the first trusted forwarded address", () => {
  const headers = new Headers({ "x-vercel-forwarded-for": "203.0.113.4, 10.0.0.1" });
  const key = pioneerClientKey(headers);
  assert.match(key, /^[a-f0-9]{64}$/);
  assert.equal(key.includes("203.0.113.4"), false);
  assert.equal(key, pioneerClientKey(new Headers({ "x-vercel-forwarded-for": "203.0.113.4" })));
});

test("isolated probe keys work only in Preview and remain hashed", () => {
  const headers = new Headers({ "x-schoolkit-rate-limit-test-key": "isolated-run-123", "x-forwarded-for": "203.0.113.4" });
  assert.equal(isPreviewRateLimitProbe(headers, { VERCEL_ENV: "preview" }), true);
  assert.equal(isPreviewRateLimitProbe(headers, { VERCEL_ENV: "production" }), false);
  const previewKey = pioneerClientKey(headers, { VERCEL_ENV: "preview" });
  const productionKey = pioneerClientKey(headers, { VERCEL_ENV: "production" });
  assert.match(previewKey, /^[a-f0-9]{64}$/);
  assert.notEqual(previewKey, productionKey);
});
