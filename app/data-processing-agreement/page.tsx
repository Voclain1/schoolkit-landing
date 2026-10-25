import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

// The data processing agreement between each school (controller) and
// SchoolKit (processor), under the NDPA 2023. It forms part of the Terms of
// Service, which a school accepts at sign-up.

const TITLE = "Data Processing Agreement | SchoolKit";
const DESCRIPTION =
  "The agreement between each school and SchoolKit on how SchoolKit processes student, parent and staff data on the school's behalf, under the Nigeria Data Protection Act 2023.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/data-processing-agreement" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/data-processing-agreement", type: "article" },
};

const EFFECTIVE_DATE = "25 October 2026";

const sections: LegalSection[] = [
  {
    id: "scope",
    heading: "What this agreement is",
    body: (
      <>
        <p>
          This Data Processing Agreement (&quot;DPA&quot;) is between the school that
          uses SchoolKit (&quot;the School&quot;) and SchoolKit (&quot;we&quot;). It forms
          part of our <Link href="/terms-of-service">Terms of Service</Link> and applies
          whenever we process personal data on the School&apos;s behalf. The School
          accepts it when it creates its SchoolKit account. Where this DPA and the Terms
          differ on personal data, this DPA prevails.
        </p>
        <p>
          The School is the <strong>data controller</strong>: it decides what personal
          data about its students, parents and staff is collected and why. We are its{" "}
          <strong>data processor</strong>, as those terms are used in the Nigeria Data
          Protection Act 2023 (&quot;NDPA&quot;).
        </p>
      </>
    ),
  },
  {
    id: "details",
    heading: "The processing",
    body: (
      <ul>
        <li>
          <strong>Purpose:</strong> providing SchoolKit — records, attendance, results,
          fees, communication, health and sickbay records, admissions, the school&apos;s
          web page and the other features the School uses.
        </li>
        <li>
          <strong>People:</strong> students, applicants, parents and guardians, staff,
          and visitors to the School&apos;s web page.
        </li>
        <li>
          <strong>Data:</strong> the categories listed in our{" "}
          <Link href="/privacy-policy#what-we-collect">Privacy Policy</Link>, including
          sensitive data (health information, and BVN where the School uses payroll).
        </li>
        <li>
          <strong>Duration:</strong> for as long as the School uses SchoolKit, then as
          set out in section 9.
        </li>
      </ul>
    ),
  },
  {
    id: "school-duties",
    heading: "The School's responsibilities",
    body: (
      <>
        <p>The School is responsible for:</p>
        <ul>
          <li>
            having a lawful basis for the data it puts into SchoolKit, including{" "}
            <strong>the consent of a parent or guardian for each child</strong>, as
            section 31 of the NDPA requires, and explicit consent before recording health
            information;
          </li>
          <li>
            telling parents and staff that it uses SchoolKit, what it records and how to
            contact the School about it — we provide a ready-made letter for this in{" "}
            <strong>Settings → Data protection</strong>;
          </li>
          <li>
            giving staff only the access their role needs, and removing access promptly
            when someone leaves;
          </li>
          <li>
            answering requests from parents, students and staff to see, correct or delete
            their data, with our help;
          </li>
          <li>
            keeping photos of pupils off its public web page, as SchoolKit requires.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "our-duties",
    heading: "Our commitments",
    body: (
      <>
        <p>We will:</p>
        <ul>
          <li>
            process the School&apos;s personal data only on its documented instructions
            — this DPA, the Terms, and what the School does in SchoolKit — unless the
            law requires otherwise, in which case we will tell the School first unless
            the law forbids it;
          </li>
          <li>
            never sell it, use it for advertising, or use it for our own purposes beyond
            running, securing and improving SchoolKit;
          </li>
          <li>
            make sure everyone at SchoolKit who can reach it is bound by
            confidentiality;
          </li>
          <li>
            keep each school&apos;s data separate from every other school&apos;s, and
            apply the security measures in section 6;
          </li>
          <li>
            help the School answer requests from individuals, carry out data protection
            impact assessments, and deal with the Nigeria Data Protection Commission;
          </li>
          <li>
            give the School the information it reasonably needs to show it is complying,
            and answer reasonable written questions about our processing.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sub-processors",
    heading: "Other providers we use",
    body: (
      <>
        <p>
          The School authorises us to use the categories of provider listed in our{" "}
          <Link href="/privacy-policy#sharing">Privacy Policy</Link> (hosting, storage,
          email, SMS, notifications, payments, error reports, product measurement and AI
          drafting). The School can ask us for the current list, naming each provider,
          at any time.
        </p>
        <p>
          We bind each one by contract to protect the data at least as well as this DPA
          requires, and we remain responsible to the School for them. We will tell the
          School at least 30 days before adding a provider that will handle student
          data, and the School may object on reasonable data-protection grounds; if we
          cannot resolve the objection, the School may cancel and receive a refund of
          any prepaid fee for the unused period.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <ul>
        <li>Encryption in transit and at rest; BVN encrypted in the database</li>
        <li>
          Each school&apos;s data separated at the database level, so one school&apos;s
          staff cannot reach another&apos;s
        </li>
        <li>Role-based access inside each school, and an activity log of sensitive actions</li>
        <li>Passwords stored as one-way hashes; two-step sign-in available to every member of staff</li>
        <li>Backups, with restore tests</li>
        <li>Access to live systems limited to the fewest SchoolKit people necessary</li>
      </ul>
    ),
  },
  {
    id: "breaches",
    heading: "Personal data breaches",
    body: (
      <p>
        If we become aware of a breach affecting the School&apos;s personal data, we will
        tell the School without undue delay, and in any case within 48 hours, with what we
        know: what happened, the data and people affected, the likely consequences and
        what we are doing. We will notify the Nigeria Data Protection Commission within
        72 hours where the NDPA requires, and help the School tell the people affected.
      </p>
    ),
  },
  {
    id: "transfers",
    heading: "Transfers outside Nigeria",
    body: (
      <p>
        Some processing happens outside Nigeria, as our{" "}
        <Link href="/privacy-policy#transfers">Privacy Policy</Link> describes. We make such
        transfers only on a basis the NDPA allows, including contractual safeguards with
        each provider. A school that needs its data kept in a particular country should
        talk to us before it starts.
      </p>
    ),
  },
  {
    id: "end",
    heading: "When the School leaves",
    body: (
      <p>
        The School can ask us at any time for a copy of its data in common formats
        (such as CSV and PDF). When its account closes, the data stays available to
        export for 90 days, then we delete it or make it
        irreversibly anonymous, except what the law requires us to keep (such as
        financial records, for at least 6 years). Copies in backups are overwritten
        within a further 90 days. On request, we will confirm the deletion in writing.
      </p>
    ),
  },
  {
    id: "general",
    heading: "General",
    body: (
      <p>
        This DPA is governed by the laws of the Federal Republic of Nigeria, as the
        Terms are. We may update it as the law or SchoolKit changes; we will tell schools
        at least 30 days before a change that reduces their protection. A school that
        needs a signed copy for its records can ask at{" "}
        <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
      </p>
    ),
  },
];

export default function DataProcessingAgreementPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Data Processing Agreement"
      summary="How SchoolKit processes student, parent and staff data on each school's behalf, and what each side is responsible for."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
    />
  );
}
