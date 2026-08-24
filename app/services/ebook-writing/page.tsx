import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { EbookWritingPage } from "@/components/services/EbookWritingPage";

export const metadata: Metadata = {
  title: "E-Book Writing | The Readsy Publishers",
  description:
    "A structured, professionally written e-book formatted cleanly for Kindle, EPUB, and PDF.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <EbookWritingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
