import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { BookPromotionPage } from "@/components/services/BookPromotionPage";

export const metadata: Metadata = {
  title: "Book Promotion | The Readsy Publishers",
  description:
    "Bestseller pushes, newsletter placements, and social campaigns that keep your book in front of readers.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookPromotionPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
