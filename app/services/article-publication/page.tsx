import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticlePublicationPage } from "@/components/services/ArticlePublicationPage";
import { getServiceDetail } from "@/lib/serviceDetails";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/article-publication";
const service = getServiceDetail("article-publication")!;

export const metadata: Metadata = pageMetadata({
  title: "Article Publication Services | The Readsy Publishers",
  description:
    "SEO-optimized articles and blog posts written and published to build your author brand.",
  path: PATH,
  keywords: ["article writing service", "blog writing and publishing", "seo article writer"],
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
        <ArticlePublicationPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
