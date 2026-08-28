import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { CoverGeneratorPage } from "@/components/CoverGeneratorPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { COVER_FAQS } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/cover-generator";

export const metadata: Metadata = pageMetadata({
  title: "Free AI Book Cover Generator | The Readsy Publishers",
  description:
    "Enter your book's title, genre, and style to generate three original AI book cover concepts in minutes, free from The Readsy Publishers.",
  path: PATH,
  keywords: ["ai book cover generator", "free book cover maker", "book cover design tool"],
});

export default function CoverGenerator() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI Cover Generator", path: PATH },
          ]),
          faqJsonLd(COVER_FAQS),
        ]}
      />
      <Header />
      <main className="flex-1">
        <CoverGeneratorPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
