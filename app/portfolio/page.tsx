import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PortfolioPage } from "@/components/PortfolioPage";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "Our Portfolio | The Readsy Publishers Ghostwriting & Book Publishing",
  description:
    "Explore real books The Readsy Publishers has ghostwritten, edited, designed, and published for authors across memoir, fiction, and children's genres.",
};

export default function Portfolio() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PortfolioPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
