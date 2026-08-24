import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { ArticlePublicationPage } from "@/components/services/ArticlePublicationPage";

export const metadata: Metadata = {
  title: "Article Publication | The Readsy Publishers",
  description:
    "SEO-optimized articles and blog posts written and published to build your author brand.",
};

export default function Page() {
  return (
    <>
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
