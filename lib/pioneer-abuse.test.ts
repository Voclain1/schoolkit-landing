import assert from "node:assert/strict";
import test from "node:test";
import { createRateLimiter, pioneerClientKey } from "./pioneer-abuse.ts";

test("rate limiter blocks requests over the limit and reports a retry window", () => {
  const check = createRateLimiter(2, 1_000);
  assert.deepEqual(check("client", 10_000), { allowed: true, retryAfter: 0 });
  assert.deepEqual(check("client", 10_100), { allowed: true, retryAfter: 0 });
  assert.deepEqual(check("client", 10_200), { allowed: false, retryAfter: 1 });
  assert.deepEqual(check("client", 11_000), { allowed: true, retryAfter: 0 });
});

test("client keys are hashed and use the first trusted forwarded address", () => {
  const headers = new Headers({ "x-vercel-forwarded-for": "203.0.113.4, 10.0.0.1" });
  const key = pioneerClientKey(headers);
  assert.match(key, /^[a-f0-9]{64}$/);
  assert.equal(key.includes("203.0.113.4"), false);
  assert.equal(key, pioneerClientKey(new Headers({ "x-vercel-forwarded-for": "203.0.113.4" })));
});

