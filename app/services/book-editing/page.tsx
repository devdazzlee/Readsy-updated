import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookEditingPage } from "@/components/services/BookEditingPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/book-editing";
const service = getServiceDetail("book-editing")!;

export const metadata: Metadata = pageMetadata({
  title: "Book Editing Services | The Readsy Publishers",
  description:
    "Developmental, line, and copy editing that tightens structure, strengthens voice, and catches every error before print.",
  path: PATH,
  keywords: ["book editing services", "developmental editing", "line editing service"],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/pricing" },
            { name: service.title, path: PATH },
          ]),
          serviceJsonLd({
            name: service.title,
            description: service.heroSubtext,
            path: PATH,
            price: service.price,
          }),
          faqJsonLd(service.faqs),
        ]}
      />
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
