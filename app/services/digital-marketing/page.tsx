import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { DigitalMarketingPage } from "@/components/services/DigitalMarketingPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/digital-marketing";
const service = getServiceDetail("digital-marketing")!;

export const metadata: Metadata = pageMetadata({
  title: "Digital Marketing for Authors | The Readsy Publishers",
  description:
    "Ongoing social, email, and ad management that grows your author brand between releases.",
  path: PATH,
  keywords: [
    "author digital marketing",
    "social media management for authors",
    "author brand marketing",
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
        <DigitalMarketingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
