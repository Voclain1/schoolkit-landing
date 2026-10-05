import type { Metadata } from "next";
import Link from "next/link";
import FeesCalculator from "@/components/tools/FeesCalculator";
import ToolPage from "@/components/tools/ToolPage";
import { SITE_URL } from "@/lib/brand";

const TITLE = "Free School Fees Calculator for Nigerian Schools | SchoolKit";
const DESCRIPTION =
  "Free school fees calculator: add up termly and one-off fees, apply a sibling discount, plan instalments and see what your school should collect each term.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "school fees calculator",
    "school fee schedule",
    "school fees structure Nigeria",
    "how to calculate school fees",
    "school fees instalment plan",
  ],
  alternates: { canonical: "/tools/school-fees-calculator" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/tools/school-fees-calculator`, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "What should a Nigerian school fee schedule include?",
    answer:
      "Most schools list tuition and the levies charged every term (development, PTA, ICT, sports), then the one-off items charged once a session or on admission, such as uniforms, books and an admission fee. Showing the two groups separately helps parents see why the first term costs more.",
  },
  {
    question: "How is the sibling discount applied?",
    answer:
      "The calculator applies the discount to termly fees only, which is how most schools do it. One-off items such as uniforms and books are charged in full for every child.",
  },
  {
    question: "How are instalments worked out?",
    answer:
      "The first-term amount is split into equal parts rounded to the nearest ₦100, and the last instalment absorbs the difference, so the instalments always add up to exactly the total.",
  },
  {
    question: "Is anything I enter saved?",
    answer: "No. The calculator runs in your browser and nothing you type is uploaded or stored.",
  },
];

export default function FeesCalculatorPage() {
  return (
    <ToolPage
      slug="school-fees-calculator"
      name="School Fees Calculator"
      h1="Free school fees calculator"
      lede="Build your fee schedule for the term, see the first-term and full-session cost per child, plan instalments and work out what the school should collect."
      description={DESCRIPTION}
      faqs={FAQS}
      tool={<FeesCalculator />}
      cta={{
        title: "Now collect it without the WhatsApp chase",
        body: "SchoolKit turns your fee schedule into invoices, lets parents pay through Paystack, and tracks part payments and balances automatically.",
        href: "/features/school-fees-management-software",
      }}
    >
      <h2>Setting school fees that parents can plan for</h2>
      <p>
        Parents pay more reliably when they can see the whole year in advance. Separate what is charged every term from
        what is charged once, publish the full-session figure, and offer a clear instalment plan instead of agreeing a
        different arrangement with each family.
      </p>
      <p>
        Once the schedule is set, the hard part is collecting it. Our guides on{" "}
        <Link href="/blog/how-to-collect-school-fees-online-nigeria">collecting school fees online</Link> and{" "}
        <Link href="/blog/how-to-reduce-late-fee-payments-nigerian-school">reducing late fee payments</Link> cover what
        works for Nigerian private schools.
      </p>
    </ToolPage>
  );
}
