import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PrivacyPage } from "@/components/PrivacyPage";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "Privacy Policy | The Readsy Publishers",
  description:
    "Learn how The Readsy Publishers collects, uses, and protects your information, including our SMS messaging terms and conditions.",
};

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PrivacyPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
