import assert from "node:assert/strict";
import test from "node:test";
import { hasAnalyticsConsent, parseConsent, readConsent } from "./consent.ts";

test("parseConsent accepts only the two choices", () => {
  assert.equal(parseConsent("accepted"), "accepted");
  assert.equal(parseConsent("declined"), "declined");
  assert.equal(parseConsent("yes"), null);
  assert.equal(parseConsent(""), null);
  assert.equal(parseConsent(null), null);
  assert.equal(parseConsent(undefined), null);
});

test("without a browser there is no consent", () => {
  assert.equal(readConsent(), null);
  assert.equal(hasAnalyticsConsent(), false);
});
