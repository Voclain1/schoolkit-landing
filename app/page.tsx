import { getHomepageBodyHtml, getHomepageFaqs, getHomepageScript } from "@/lib/landing";
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
      <script dangerouslySetInnerHTML={{ __html: getHomepageScript() }} />
    </>
  );
}
