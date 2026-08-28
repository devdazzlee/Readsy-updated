import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookWritingPage } from "@/components/services/BookWritingPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/book-writing";
const service = getServiceDetail("book-writing")!;

export const metadata: Metadata = pageMetadata({
  title: "Book Writing Services | The Readsy Publishers",
  description:
    "Full manuscript development from your concept to a finished draft, written and structured by our team.",
  path: PATH,
  keywords: ["book writing service", "hire a book writer", "manuscript writing service"],
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
        <BookWritingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
