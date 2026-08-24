import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { ContactPage } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "Contact The Readsy Publishers | Ghostwriting, Publishing & Book Marketing",
  description:
    "Talk with a publishing specialist from The Readsy Publishers about ghostwriting, editing, cover design, publishing, and book marketing.",
};

export default function Contact() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContactPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
