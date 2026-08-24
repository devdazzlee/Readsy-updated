import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { ChildrensBookIllustrationsPage } from "@/components/services/ChildrensBookIllustrationsPage";

export const metadata: Metadata = {
  title: "Children's Book Illustrations | The Readsy Publishers",
  description:
    "Custom illustrations that bring your children's story to life, from character design to print-ready art.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ChildrensBookIllustrationsPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
