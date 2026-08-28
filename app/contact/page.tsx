import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { ContactPage } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_FAQS } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact The Readsy Publishers | Ghostwriting, Publishing & Book Marketing",
  description:
    "Talk with a publishing specialist from The Readsy Publishers about ghostwriting, editing, cover design, publishing, and book marketing.",
  path: PATH,
  keywords: ["contact a ghostwriting company", "book publishing consultation"],
});

export default function Contact() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: PATH },
          ]),
          faqJsonLd(CONTACT_FAQS),
        ]}
      />
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
