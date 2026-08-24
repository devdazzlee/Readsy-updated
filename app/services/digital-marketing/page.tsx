import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { DigitalMarketingPage } from "@/components/services/DigitalMarketingPage";

export const metadata: Metadata = {
  title: "Digital Marketing | The Readsy Publishers",
  description:
    "Ongoing social, email, and ad management that grows your author brand between releases.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <DigitalMarketingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
