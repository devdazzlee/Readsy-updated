import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PricingPage } from "@/components/PricingPage";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "Pricing | The Readsy Publishers Ghostwriting & Publishing Services",
  description:
    "Transparent starting prices for ghostwriting, book editing, proofreading, publishing, marketing, and children's book services from The Readsy Publishers.",
};

export default function Pricing() {
  return (
    <>
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
