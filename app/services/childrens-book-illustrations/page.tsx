import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChildrensBookIllustrationsPage } from "@/components/services/ChildrensBookIllustrationsPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/childrens-book-illustrations";
const service = getServiceDetail("childrens-book-illustrations")!;

export const metadata: Metadata = pageMetadata({
  title: "Children's Book Illustration Services | The Readsy Publishers",
  description:
    "Custom illustrations that bring your children's story to life, from character design to print-ready art.",
  path: PATH,
  keywords: [
    "children's book illustrator",
    "childrens book illustration service",
    "hire a childrens book illustrator",
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
        <ChildrensBookIllustrationsPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
