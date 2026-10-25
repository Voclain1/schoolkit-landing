import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

// The public page the app stores ask for: how anyone with a SchoolKit
// account asks for it to be deleted, from the app or without it, and what
// happens to the data (naija-class docs/modules/account-deletion-requests.md).

const TITLE = "Delete your account | SchoolKit";
const DESCRIPTION =
  "How parents, students and school staff ask for their SchoolKit account to be deleted, from the app or by email, and what happens to their data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/delete-account" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/delete-account", type: "article" },
};

const EFFECTIVE_DATE = "25 October 2026";

const sections: LegalSection[] = [
  {
    id: "who",
    heading: "Who this is for",
    body: (
      <>
        <p>
          This page is for anyone with a SchoolKit account: parents and guardians,
          students, and teachers and other school staff, whether you use the SchoolKit
          app, the parents&apos; site or the staff site.
        </p>
        <p>
          Your account was set up by your school, and your school holds the records
          linked to it. So a deletion request goes to your school, which removes the
          account, and SchoolKit makes sure it is done.
        </p>
      </>
    ),
  },
  {
    id: "in-the-app",
    heading: "Ask from the SchoolKit app",
    body: (
      <>
        <ol>
          <li>Open the SchoolKit app and sign in.</li>
          <li>
            Go to <strong>Settings</strong> (parents), your <strong>Profile</strong>{" "}
            (staff) or the <strong>Home</strong> screen (students).
          </li>
          <li>
            Find <strong>Delete my account</strong> and press{" "}
            <strong>Request account deletion</strong>, then confirm.
          </li>
        </ol>
        <p>
          The card then shows the date you asked. Asking again changes nothing; your
          request is already with the school.
        </p>
      </>
    ),
  },
  {
    id: "without-the-app",
    heading: "Ask without the app",
    body: (
      <>
        <p>
          If you cannot sign in, or no longer have the app, email{" "}
          <a href="mailto:hello@schoolkit.ng?subject=Account%20deletion">
            hello@schoolkit.ng
          </a>{" "}
          with the subject <strong>Account deletion</strong>, from the email address on
          your account if you can. Tell us:
        </p>
        <ul>
          <li>your full name and your school&apos;s name;</li>
          <li>whether you are a parent, a student or a member of staff;</li>
          <li>for a student account, the parent or guardian who is asking.</li>
        </ul>
        <p>
          We will check that the request comes from you, pass it to your school, and
          reply to confirm. You can also ask your school directly.
        </p>
      </>
    ),
  },
  {
    id: "what-happens",
    heading: "What happens next",
    body: (
      <>
        <ul>
          <li>
            <strong>Your access ends.</strong> The school switches off the account, so
            you can no longer sign in and you are signed out on every device. We aim for
            this within 30 days of your request, and we follow up with the school if it
            has not acted.
          </li>
          <li>
            <strong>Your personal details are deleted</strong> where nobody needs to
            keep them: your sign-in details, your contact details where they are not
            part of a child&apos;s school record, and your app notification settings.
          </li>
          <li>
            <strong>Some records are kept, as the law requires.</strong> Payment
            receipts and other financial records are kept for at least 6 years for tax
            and accounting. A student&apos;s school record — results, attendance,
            enrolment — belongs to the school and stays with it. Messages with the school
            are deleted on their normal schedule, 2 years after a conversation closes.
          </li>
          <li>
            <strong>Backups.</strong> Deleted data stays in encrypted backups for up to
            90 days before it is overwritten.
          </li>
        </ul>
        <p>
          If the school decides it must keep something, it will tell you what and why.
          If you disagree, write to us; you can also complain to the Nigeria Data
          Protection Commission. Our <Link href="/privacy-policy">Privacy Policy</Link>{" "}
          explains your rights.
        </p>
      </>
    ),
  },
  {
    id: "schools",
    heading: "For a whole school",
    body: (
      <p>
        A school that wants to close its SchoolKit account and have its data deleted
        should email <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a> from the
        owner&apos;s address. The school&apos;s data stays available to export for 90
        days, then is deleted, as set out in our{" "}
        <Link href="/data-processing-agreement">Data Processing Agreement</Link>.
      </p>
    ),
  },
];

export default function DeleteAccountPage() {
  return (
    <LegalPage
      eyebrow="Your account"
      title="Delete your account"
      summary="How to ask for your SchoolKit account to be deleted, and what happens to your data."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
    />
  );
}
