import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { GhostWritingPage } from "@/components/services/GhostWritingPage";

export const metadata: Metadata = {
  title: "Ghost Writing | The Readsy Publishers",
  description:
    "Professional ghostwriting that turns your ideas, notes, or interviews into a polished, publish-ready manuscript in your voice.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <GhostWritingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
