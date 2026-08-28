import type { Metadata } from "next";
import { AiConcierge } from "@/components/AiConcierge";
import { BookBlueprint } from "@/components/BookBlueprint";
import { ChatWidget } from "@/components/ChatWidget";
import { ExploreSection } from "@/components/ExploreSection";
import { Footer } from "@/components/Footer";
import { GenreStrip } from "@/components/GenreStrip";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PainSection } from "@/components/PainSection";
import { Portfolio } from "@/components/Portfolio";
import { ProcessSection } from "@/components/ProcessSection";
import { PublishingBanner } from "@/components/PublishingBanner";
import { QuoteForm } from "@/components/QuoteForm";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesGrid } from "@/components/ServicesGrid";
import { StatsBar } from "@/components/StatsBar";
import { StudioCta } from "@/components/StudioCta";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PRICING_PLANS } from "@/lib/content";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The Readsy Publishers | Ghostwriting, Publishing & Book Marketing",
  description:
    "Turn your story into a published masterpiece. Ghostwriting, editing, publishing, cover design, and book marketing for authors in the US and UK.",
  path: "/",
  keywords: [
    "ghostwriting services",
    "book ghostwriter",
    "book editing services",
    "self publishing company",
    "book cover design",
    "book marketing agency",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: PRICING_PLANS.map((plan, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/services/${plan.id}`,
            name: plan.title,
          })),
        }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <StatsBar />
        <GenreStrip />
        <ServicesGrid />
        <ExploreSection />
        <PainSection />
        <PublishingBanner />
        <Portfolio />
        <BookBlueprint />
        <AiConcierge />
        <ProcessSection />
        <WhyChooseUs />
        <StudioCta
          image="/images/sections/home-cta.jpg"
          imageAlt="A proud author holding their newly published book"
        />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
      <QuoteModal />
      <ChatWidget />
    </>
  );
}
