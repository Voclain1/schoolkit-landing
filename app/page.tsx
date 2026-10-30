import HomepageGetStarted from "@/components/HomepageGetStarted";
import "./homepage.css";
import HomepageInteractions from "@/components/HomepageInteractions";
import { getHomepageBodyHtml, getHomepageFaqs } from "@/lib/landing";
import { faqJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

export default function Home() {
  const faqs = getHomepageFaqs();

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(faqs)) }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: getHomepageBodyHtml() }} />
      <HomepageGetStarted />
      <HomepageInteractions />
    </>
  );
}

