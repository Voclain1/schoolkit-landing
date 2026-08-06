import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import { getFaviconDataUri, getSiteScript } from "@/lib/landing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const SITE_URL = "https://schoolkit.ng";

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

const TITLE = "SchoolKit — School Management Software for Nigerian Private Schools";
const DESCRIPTION =
  "Collect school fees online via Paystack, track attendance, generate report cards and communicate with parents automatically. Built for Nigerian private schools. Free to start.";
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
  name: "SchoolKit",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web, iOS, Android",
  description: DESCRIPTION,
  url: SITE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "NGN",
      description: "Up to 30 students, basic dashboard, attendance and fee tracking.",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "30000",
      priceCurrency: "NGN",
      description: "Up to 100 students — Paystack fee collection, receipts, report cards, parent communication.",
    },
  ],
  provider: {
    "@type": "Organization",
    name: "SchoolKit",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
  },
  // aggregateRating intentionally omitted until there are real reviews to report —
  // Google's structured-data guidelines treat fabricated ratings as spam.
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
  <MetaPixel />

  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script dangerouslySetInnerHTML={{ __html: getSiteScript() }} />
      </body>
    </html>
  );
}
