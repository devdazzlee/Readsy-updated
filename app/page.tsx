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
import { ServicesGrid } from "@/components/ServicesGrid";
import { StatsBar } from "@/components/StatsBar";
import { StudioCta } from "@/components/StudioCta";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
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
        <StudioCta />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
      <QuoteModal />
      <ChatWidget />
    </>
  );
}
