import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import { getFaviconDataUri, getSiteScript } from "@/lib/landing";
import { serializeJsonLd } from "@/lib/json-ld";
import AnnounceBar from "@/components/AnnounceBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import MetaPixel from "@/components/MetaPixel";
import Analytics from "@/components/Analytics";
import { BRAND, PLANS, SITE_URL } from "@/lib/brand";
import "./globals.css";


const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const TITLE = "School Management Software for Nigerian Schools | SchoolKit";
const DESCRIPTION =
  "SchoolKit is school management software for Nigerian private schools — fees, attendance, results, parent communication and a WAEC-aligned AI tutor, all in one platform.";
const OG_TITLE = "SchoolKit — Run Your School. Not Your Spreadsheets.";
const OG_DESCRIPTION =
  "The school management platform built for Nigerian private schools. Fee collection, attendance, results and AI tutor. Free early access.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    siteName: "SchoolKit",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
  icons: {
    icon: getFaviconDataUri(),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web, iOS, Android",
  description: DESCRIPTION,
  url: SITE_URL,
  offers: PLANS.filter((plan) => plan.pricePerTerm !== null).map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: String(plan.pricePerTerm),
    priceCurrency: "NGN",
    description: `Up to ${plan.maxStudents?.toLocaleString("en-NG")} students. ${plan.summary}`,
  })),
  provider: { "@id": `${SITE_URL}/#organization` },
  // aggregateRating intentionally omitted until there are real reviews to report —
  // Google's structured-data guidelines treat fabricated ratings as spam.
};

// Organization and WebSite entities: give Google a single, consistent identity for
// the brand (knowledge panel, sitelinks) across every page on the site.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND.name,
  url: SITE_URL,
  description: BRAND.oneLiner,
  logo: `${SITE_URL}/favicon.png`,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: BRAND.city,
    addressCountry: "NG",
  },
  ...(BRAND.sameAs.length > 0 && { sameAs: BRAND.sameAs }),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: BRAND.whatsapp,
    email: BRAND.email,
    areaServed: "NG",
    availableLanguage: "English",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "SchoolKit",
  url: SITE_URL,
  inLanguage: "en-NG",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
      </head>
      <body>
  <MetaPixel />
  <Analytics />

  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
        <AnnounceBar />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script dangerouslySetInnerHTML={{ __html: getSiteScript() }} />
      </body>
    </html>
  );
}
