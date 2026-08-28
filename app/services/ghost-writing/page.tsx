import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { GhostWritingPage } from "@/components/services/GhostWritingPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/ghost-writing";
const service = getServiceDetail("ghost-writing")!;

export const metadata: Metadata = pageMetadata({
  title: "Ghost Writing Services | The Readsy Publishers",
  description:
    "Professional ghostwriting that turns your ideas, notes, or interviews into a polished, publish-ready manuscript in your voice.",
  path: PATH,
  keywords: ["ghostwriting services", "hire a ghostwriter", "book ghostwriter for hire"],
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
        <GhostWritingPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
