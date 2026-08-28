import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PortfolioPage } from "@/components/PortfolioPage";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/portfolio";

export const metadata: Metadata = pageMetadata({
  title: "Our Portfolio | The Readsy Publishers Ghostwriting & Book Publishing",
  description:
    "Explore real books The Readsy Publishers has ghostwritten, edited, designed, and published for authors across memoir, fiction, and children's genres.",
  path: PATH,
  keywords: ["published book examples", "ghostwriting portfolio", "book cover design portfolio"],
});

export default function Portfolio() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: PATH },
        ])}
      />
      <Header />
      <main className="flex-1">
        <PortfolioPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
