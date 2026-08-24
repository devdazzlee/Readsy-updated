import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { ChildrensBookPublicationPage } from "@/components/services/ChildrensBookPublicationPage";

export const metadata: Metadata = {
  title: "Children's Book Publication | The Readsy Publishers",
  description:
    "Age-right formatting, print-ready layouts, and retail listings sized for picture books and early readers.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ChildrensBookPublicationPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
