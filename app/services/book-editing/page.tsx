import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { BookEditingPage } from "@/components/services/BookEditingPage";

export const metadata: Metadata = {
  title: "Book Editing | The Readsy Publishers",
  description:
    "Developmental, line, and copy editing that tightens structure, strengthens voice, and catches every error before print.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookEditingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
