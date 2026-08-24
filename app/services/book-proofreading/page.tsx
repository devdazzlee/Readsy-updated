import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { BookProofreadingPage } from "@/components/services/BookProofreadingPage";

export const metadata: Metadata = {
  title: "Book Proofreading | The Readsy Publishers",
  description:
    "A meticulous final pass that catches typos, formatting slips, and inconsistencies before your manuscript goes to print.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookProofreadingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
