import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { TermsPage } from "@/components/TermsPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | The Readsy Publishers",
  description:
    "Read the terms and conditions for ghostwriting, editing, publishing, cover design, and marketing services from The Readsy Publishers.",
};

export default function Terms() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TermsPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
