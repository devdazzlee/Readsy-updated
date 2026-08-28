import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-navy font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
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
