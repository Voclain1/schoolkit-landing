"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent, sanitizeParams } from "@/lib/analytics";

// Keep the original homepage's spreadsheet destination for email/WhatsApp leads.
const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbxxf4Z32cqWtaT2SFPcmkYgogVMPM57MpDHfD9-zrpOUmJm9eqbMrzuyzOtK3Nxp5eU/exec";

export default function HomepageEarlyAccess() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const [phoneWarning, setPhoneWarning] = useState(false);
  const submitting = useRef(false);
  const started = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("submitting");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      // The same-origin API provides readable confirmation before showing success.
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });
      const result = await response.json() as { ok?: boolean };
      if (!response.ok || result.ok !== true) throw new Error("Signup was not confirmed");

      // Preserve the original Google Sheet sync. Its opaque response cannot
      // confirm storage, so the success state refers only to the verified email.
      try {
        await fetch(WAITLIST_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify({ email, phone, ts: new Date().toISOString(), source: "footer" }),
          signal: controller.signal,
        });
      } catch {
        setPhoneWarning(Boolean(phone));
      }
      trackEvent("pilot_application_submitted", { form_id: "footer", placement: "homepage-early-access", method: "web" });
      window.fbq?.("track", "Lead", sanitizeParams({ placement: "homepage-early-access", method: "web" }));
      form.reset();
      setStatus("success");
    } catch {
      setError("We couldn’t confirm your signup. Please try again, or message us on WhatsApp.");
      setStatus("idle");
    } finally {
      clearTimeout(timer);
      submitting.current = false;
    }
  }

  return (
    <div className="sk-home">
      <span id="waitlist" aria-hidden="true" />
      <section className="sk-section sk-final" id="join" aria-labelledby="early-access-heading">
        <div className="wrap">
          <div className="sk-final-card">
            <p className="sk-eyebrow">A CLEARER SCHOOL DAY STARTS HERE</p>
            <h2 id="early-access-heading">Join SchoolKit<br /><mark>early access.</mark></h2>
            <p>Leave your email and, if you’d like, your WhatsApp number. We’ll help you take the next step with your school.</p>
            {status === "success" ? (
              <div className="sk-access-success" role="status">
                <strong>Thank you — your email is on the early-access list.</strong>
                <p>Look out for updates from hello@schoolkit.ng.</p>
                {phoneWarning && <p>We couldn’t send your WhatsApp details. You can still message the team directly below.</p>}
              </div>
            ) : (
              <form className="sk-access-form" onSubmit={submit} aria-busy={status === "submitting"} onInput={() => {
                if (started.current) return;
                started.current = true;
                trackEvent("pilot_application_started", { form_id: "footer", placement: "homepage-early-access" });
              }}>
                <div className="sk-access-fields">
                  <div><label htmlFor="early-access-email">Email address</label><input id="early-access-email" name="email" type="email" autoComplete="email" placeholder="you@yourschool.com" maxLength={254} required disabled={status === "submitting"} /></div>
                  <div><label htmlFor="early-access-phone">WhatsApp number <span>(optional)</span></label><input id="early-access-phone" name="phone" type="tel" autoComplete="tel" placeholder="e.g. 08012345678" maxLength={30} disabled={status === "submitting"} /></div>
                </div>
                {error && <p className="sk-access-error" role="alert">{error}</p>}
                <button className="sk-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Joining…" : "Join early access"}<span aria-hidden="true">↗</span></button>
                <p className="sk-fine">By joining, you agree to our <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
              </form>
            )}
            <div className="sk-actions"><a href="https://app.schoolkit.ng" className="sk-text-link">Open SchoolKit <span aria-hidden="true">↗</span></a><a href="https://wa.me/2347049677393?text=Hello%20SchoolKit%2C%20I%27d%20like%20early%20access%20for%20my%20school." className="sk-text-link" data-location="homepage-early-access">Talk to the team →</a></div>
          </div>
        </div>
      </section>
    </div>
  );
}
