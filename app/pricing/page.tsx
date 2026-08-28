import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PricingPage } from "@/components/PricingPage";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PRICING_FAQS, PRICING_PLANS } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

const PATH = "/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Pricing | The Readsy Publishers Ghostwriting & Publishing Services",
  description:
    "Transparent starting prices for ghostwriting, book editing, proofreading, publishing, marketing, and children's book services from The Readsy Publishers.",
  path: PATH,
  keywords: ["ghostwriting prices", "book editing cost", "book publishing package pricing"],
});

export default function Pricing() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: PATH },
          ]),
          faqJsonLd(PRICING_FAQS),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: PRICING_PLANS.map((plan, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/services/${plan.id}`,
              name: plan.title,
            })),
          },
        ]}
      />
      <Header />
      <main className="flex-1">
        <PricingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
