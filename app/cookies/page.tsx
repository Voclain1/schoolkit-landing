import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import CookieSettingsButton from "@/components/CookieSettingsButton";

const TITLE = "Cookie Policy | SchoolKit";
const DESCRIPTION =
  "The cookies and similar storage SchoolKit uses on schoolkit.ng and in its applications, and how to change your choice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cookies" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/cookies", type: "article" },
};

const EFFECTIVE_DATE = "25 October 2026";

const sections: LegalSection[] = [
  {
    id: "what",
    heading: "What cookies are",
    body: (
      <p>
        Cookies are small files a website stores in your browser. Similar storage
        (&quot;local storage&quot;) works the same way. Some are needed for a site to work;
        others measure how a site is used or help with advertising.
      </p>
    ),
  },
  {
    id: "website",
    heading: "On this website, schoolkit.ng",
    body: (
      <>
        <h3>Always on: essential</h3>
        <ul>
          <li>
            <strong>Your cookie choice</strong> (local storage,{" "}
            <code>sk-cookie-consent</code>) — remembers whether you accepted or declined,
            so we do not ask on every page. Kept until you clear it.
          </li>
        </ul>
        <h3>Only if you accept: analytics and advertising</h3>
        <ul>
          <li>
            <strong>Google Analytics</strong> (<code>_ga</code>, <code>_ga_*</code>, up to
            2 years) — counts visits and shows which pages lead schools to sign up. We
            send it no names, emails or phone numbers.
          </li>
          <li>
            <strong>Meta Pixel</strong> (<code>_fbp</code>, up to 3 months, and Meta&apos;s
            own cookies) — measures our advertising on Facebook and Instagram and which
            pages lead to an early-access sign-up.
          </li>
        </ul>
        <p>
          Until you press <strong>Accept</strong>, neither of these loads. If you decline,
          the site works exactly the same.
        </p>
        <p>
          <CookieSettingsButton />
        </p>
      </>
    ),
  },
  {
    id: "apps",
    heading: "In the SchoolKit applications",
    body: (
      <>
        <p>
          The staff site, the parents&apos; site, school web pages and the apps use no
          advertising cookies and no Meta Pixel.
        </p>
        <ul>
          <li>
            <strong>Sign-in</strong> — a secure cookie that keeps you signed in, and the
            app&apos;s sign-in token on your phone. Needed for the service to work.
          </li>
          <li>
            <strong>Preferences</strong> — local storage for things like a dismissed
            notice or a remembered filter.
          </li>
          <li>
            <strong>Product measurement on the staff site</strong> — PostHog cookies
            (<code>ph_*</code>) record which features staff use, with opaque references
            only: no names, no student data and no screen recordings. We use this to fix
            problems and improve SchoolKit, for the school&apos;s benefit under our
            agreement with it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "control",
    heading: "Changing your choice",
    body: (
      <p>
        Use the <strong>Cookie settings</strong> button above or in the footer of this
        site at any time. You can also delete cookies in your browser&apos;s settings, and
        limit how Meta uses your data in your Facebook or Instagram ad settings. More
        about how we handle personal data is in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      summary="The cookies SchoolKit uses, and how to change your choice."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
    />
  );
}
