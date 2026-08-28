import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChildrensBookPublicationPage } from "@/components/services/ChildrensBookPublicationPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/childrens-book-publication";
const service = getServiceDetail("childrens-book-publication")!;

export const metadata: Metadata = pageMetadata({
  title: "Children's Book Publication Services | The Readsy Publishers",
  description:
    "Age-right formatting, print-ready layouts, and retail listings sized for picture books and early readers.",
  path: PATH,
  keywords: [
    "children's book publishing",
    "picture book publishing service",
    "publish a children's book",
  ],
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
        <ChildrensBookPublicationPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
