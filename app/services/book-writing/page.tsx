import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { BookWritingPage } from "@/components/services/BookWritingPage";

export const metadata: Metadata = {
  title: "Book Writing | The Readsy Publishers",
  description:
    "Full manuscript development from your concept to a finished draft, written and structured by our team.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookWritingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
