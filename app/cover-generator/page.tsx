import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { CoverGeneratorPage } from "@/components/CoverGeneratorPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "AI Book Cover Generator | The Readsy Publishers",
  description:
    "Enter your book's title, genre, and style to generate three original AI book cover concepts in minutes, free from The Readsy Publishers.",
};

export default function CoverGenerator() {
  return (
    <>
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
