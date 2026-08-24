import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { BookPublishingPage } from "@/components/services/BookPublishingPage";

export const metadata: Metadata = {
  title: "Book Publishing | The Readsy Publishers",
  description:
    "Full-service publishing across Amazon KDP, IngramSpark, and major retail platforms — handled correctly the first time.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookPublishingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
