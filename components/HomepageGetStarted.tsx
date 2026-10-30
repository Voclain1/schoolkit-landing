"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent, sanitizeParams } from "@/lib/analytics";
import { BRAND } from "@/lib/brand";
import { CONTACT_REASONS, contactReply, type ContactReason } from "@/lib/contact-request";

// Keep the original homepage's spreadsheet destination for email/WhatsApp leads.
const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbxxf4Z32cqWtaT2SFPcmkYgogVMPM57MpDHfD9-zrpOUmJm9eqbMrzuyzOtK3Nxp5eU/exec";

export default function HomepageGetStarted() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const [phoneWarning, setPhoneWarning] = useState(false);
  const [reply, setReply] = useState("");
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
    const reason = (String(data.get("reason") ?? "") || "setup") as ContactReason;
    const website = String(data.get("website") ?? "");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      // The same-origin API provides readable confirmation before showing success.
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, reason, website }),
        signal: controller.signal,
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || result.ok !== true) throw new Error(result.error || "Request was not confirmed");

      // Preserve the original Google Sheet sync. Its opaque response cannot
      // confirm storage, so the success state refers only to the verified email.
      try {
        await fetch(WAITLIST_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify({ email, phone, reason, ts: new Date().toISOString(), source: "footer" }),
          signal: controller.signal,
        });
      } catch {
        setPhoneWarning(Boolean(phone));
      }
      trackEvent("pilot_application_submitted", { form_id: "footer", placement: "homepage-contact", method: "web" });
      window.fbq?.("track", "Lead", sanitizeParams({ placement: "homepage-contact", method: "web" }));
      setReply(contactReply(reason));
      form.reset();
      setStatus("success");
    } catch {
      setError("We couldn’t send your request. Please try again, or message us on WhatsApp.");
      setStatus("idle");
    } finally {
      clearTimeout(timer);
      submitting.current = false;
    }
  }

  return (
    <div className="sk-home">
      <span id="waitlist" aria-hidden="true" />
      <section className="sk-section sk-final" id="join" aria-labelledby="get-started-heading">
        <div className="wrap">
          <div className="sk-final-card">
            <p className="sk-eyebrow">A CLEARER SCHOOL DAY STARTS HERE</p>
            <h2 id="get-started-heading">Get started with<br /><mark>SchoolKit.</mark></h2>
            <p>Tell us what you need and leave your email and, if you’d like, your WhatsApp number. We’ll help you take the next step with your school.</p>
            {status === "success" ? (
              <div className="sk-access-success" role="status">
                <strong>{reply}</strong>
                <p>Look out for a message from hello@schoolkit.ng.</p>
                {phoneWarning && <p>We couldn’t send your WhatsApp details. You can still message the team directly below.</p>}
              </div>
            ) : (
              <form className="sk-access-form" onSubmit={submit} aria-busy={status === "submitting"} onInput={() => {
                if (started.current) return;
                started.current = true;
                trackEvent("pilot_application_started", { form_id: "footer", placement: "homepage-contact" });
              }}>
                <div className="sk-access-fields">
                  <div><label htmlFor="contact-reason">How can we help?</label><select id="contact-reason" name="reason" defaultValue="setup" required disabled={status === "submitting"}>{CONTACT_REASONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}</select></div>
                  <div><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@yourschool.com" maxLength={254} required disabled={status === "submitting"} /></div>
                  <div><label htmlFor="contact-phone">WhatsApp number <span>(optional)</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="e.g. 08012345678" maxLength={30} disabled={status === "submitting"} /></div>
                </div>
                {error && <p className="sk-access-error" role="alert">{error}</p>}
                <button className="sk-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send"}<span aria-hidden="true">↗</span></button>
                <div className="website-field" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
                <p className="sk-fine">By sending, you agree to our <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
              </form>
            )}
            <div className="sk-actions"><a href={BRAND.signupUrl} className="sk-text-link">Sign up now <span aria-hidden="true">↗</span></a><a href="https://wa.me/2347049677393?text=Hello%20SchoolKit%2C%20I%27d%20like%20to%20set%20up%20my%20school." className="sk-text-link" data-location="homepage-contact">Talk to us on WhatsApp →</a></div>
          </div>
        </div>
      </section>
    </div>
  );
}
