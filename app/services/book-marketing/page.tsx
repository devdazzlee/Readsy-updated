import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { BookMarketingPage } from "@/components/services/BookMarketingPage";

export const metadata: Metadata = {
  title: "Book Marketing | The Readsy Publishers",
  description:
    "A launch strategy, ad campaigns, and outreach plan built around your genre and audience.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookMarketingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
