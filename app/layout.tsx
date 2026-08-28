import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/components/AuthProvider";
import { ChatProvider } from "@/components/ChatProvider";
import { QuoteProvider } from "@/components/QuoteProvider";
import { ReduxProvider } from "@/components/ReduxProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { OG_IMAGE, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const SITE_TITLE = "The Readsy Publishers | Ghostwriting, Publishing & Book Marketing";
const SITE_DESCRIPTION =
  "Turn your story into a published masterpiece. Ghostwriting, editing, publishing, cover design, and book marketing for authors in the US and UK.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "ghostwriting services",
    "book ghostwriter",
    "book editing services",
    "self publishing company",
    "book cover design",
    "book marketing agency",
    "hire a ghostwriter",
    "children's book publishing",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["en_GB"],
    images: [{ url: OG_IMAGE, width: 1106, height: 456, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  other: {
    publisher: SITE_NAME,
  },
  verification: {
    google: "igNR-psOO1O8BJ7t3LkaEsc1BDD1q033lPYwBA6WTBM",
    other: {
      "msvalidate.01": "34E71DA20CA0DCA234777F3E34ED399A",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId="GTM-P462ZP4X" />
      <body className="min-h-full flex flex-col bg-surface text-navy font-sans">
        {/* Google Tag Manager (noscript) — the GoogleTagManager component
            above only injects the <head> script; GTM's own instructions
            also require this fallback immediately after <body> for visitors
            with JavaScript disabled. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P462ZP4X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
        <ReduxProvider>
          <AuthProvider>
            <QuoteProvider>
              <ChatProvider>{children}</ChatProvider>
            </QuoteProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
