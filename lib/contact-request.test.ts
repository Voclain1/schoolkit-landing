import assert from "node:assert/strict";
import test from "node:test";
import { CONTACT_REASONS, contactReasonLabel, contactReply, validateContactRequest } from "./contact-request.ts";

test("accepts an email, an optional WhatsApp number and a listed reason", () => {
  const result = validateContactRequest({ email: " Ada@Example.sch.ng ", phone: "0803 555 0142", reason: "call" });
  assert.deepEqual(result.data, { email: "ada@example.sch.ng", phone: "0803 555 0142", reason: "call" });
  assert.equal(validateContactRequest({ email: "ada@example.sch.ng", reason: "pricing" }).data?.phone, "");
});

test("treats a missing reason as setting up a school", () => {
  assert.equal(validateContactRequest({ email: "ada@example.sch.ng" }).data?.reason, "setup");
});

test("refuses a bad email, a bad phone and an unlisted reason", () => {
  assert.ok(validateContactRequest({ email: "nope" }).error);
  assert.ok(validateContactRequest({ email: "ada@example.sch.ng", phone: "call me" }).error);
  assert.ok(validateContactRequest({ email: "ada@example.sch.ng", reason: "<script>" }).error);
  assert.ok(validateContactRequest(null).error);
});

test("every reason has a label and its own reply", () => {
  for (const r of CONTACT_REASONS) {
    assert.equal(contactReasonLabel(r.value), r.label);
    assert.ok(contactReply(r.value).length > 10);
  }
});
