import type { Metadata } from "next";
import { getFaviconDataUri, getSiteScript } from "@/lib/landing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://schoolkit.ng";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SchoolKit — The operating system for Nigerian schools",
  description:
    "Fees, results, attendance, parent communication and an AI tutor that knows the WAEC syllabus — one platform, built in Nigeria for Nigerian private schools.",
  icons: {
    icon: getFaviconDataUri(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- global font links, intentionally preserved from the original static markup */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: getSiteScript() }} />
      </body>
    </html>
  );
}
