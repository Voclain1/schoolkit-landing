import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

// Refunds: SchoolKit's own subscription fees, and school fees parents pay
// through SchoolKit (which are the school's, settled by Paystack). Mirrors
// the Terms of Service: "Plans, fees and billing", "Collecting school fees"
// and "Cancellation, suspension and termination".

const TITLE = "Refund Policy | SchoolKit";
const DESCRIPTION =
  "Refunds of SchoolKit subscription fees, and how refunds of school fees paid through SchoolKit work for parents.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/refund-policy" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/refund-policy", type: "article" },
};

const EFFECTIVE_DATE = "25 October 2026";

const sections: LegalSection[] = [
  {
    id: "two-kinds",
    heading: "Two kinds of payment",
    body: (
      <ul>
        <li>
          <strong>SchoolKit subscription fees</strong> — what a school pays SchoolKit
          for a plan. Section 2 covers these.
        </li>
        <li>
          <strong>School fees</strong> — what parents pay their school through SchoolKit.
          That money is the school&apos;s, not SchoolKit&apos;s. Section 3 covers these.
        </li>
      </ul>
    ),
  },
  {
    id: "subscriptions",
    heading: "SchoolKit subscription fees",
    body: (
      <>
        <ul>
          <li>
            <strong>Free plan:</strong> nothing is charged, so there is nothing to
            refund.
          </li>
          <li>
            <strong>Cancelling:</strong> a school can cancel at any time. The plan runs
            to the end of the term or year already paid for. A part-used term or year is
            not refunded, except where the law requires it.
          </li>
          <li>
            <strong>Our failure:</strong> if SchoolKit fails to provide the service in a
            material way, we refund the affected part of the fee.
          </li>
          <li>
            <strong>Charged in error:</strong> a duplicate or wrong charge is refunded in
            full once we confirm it.
          </li>
          <li>
            <strong>If we close SchoolKit:</strong> at least 90 days&apos; notice, a full
            export of the school&apos;s data, and a refund of the unused part of any
            prepaid fee.
          </li>
        </ul>
        <p>
          To ask for a refund, email{" "}
          <a href="mailto:hello@schoolkit.ng?subject=Refund%20request">hello@schoolkit.ng</a>{" "}
          from the school owner&apos;s address with the payment reference. We reply within
          5 working days, and approved refunds are paid to the original payment method
          within 14 working days.
        </p>
      </>
    ),
  },
  {
    id: "school-fees",
    heading: "School fees paid through SchoolKit",
    body: (
      <>
        <p>
          When a parent pays school fees through SchoolKit, Paystack processes the payment
          and settles it to the school&apos;s own bank account. SchoolKit never holds the
          money, so <strong>the school decides any refund</strong> under its own fees
          policy.
        </p>
        <ul>
          <li>
            <strong>Parents:</strong> ask the school&apos;s bursary or office. If the school
            agrees, it records the refund in SchoolKit and returns the money through
            Paystack to the card or account you paid with, or by bank transfer, and your
            receipts and balance update.
          </li>
          <li>
            <strong>Paid twice, or charged but not shown as paid:</strong> tell the school
            with your payment reference. Paystack&apos;s reference lets the school find
            the payment; SchoolKit can help the school trace it.
          </li>
          <li>
            <strong>Timing:</strong> a refund through Paystack usually reaches a card or
            account within 5 to 15 working days, depending on your bank.
          </li>
        </ul>
        <p>
          A dispute with a school about fees is between the family and the school.
          SchoolKit cannot overrule the school or move its money.
        </p>
      </>
    ),
  },
  {
    id: "more",
    heading: "More",
    body: (
      <p>
        The full terms are in our <Link href="/terms-of-service">Terms of Service</Link>.
        Questions: <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      summary="Refunds of SchoolKit subscription fees, and of school fees paid through SchoolKit."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
    />
  );
}
