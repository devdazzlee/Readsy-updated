import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { TermsPage } from "@/components/TermsPage";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/terms";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions | The Readsy Publishers",
  description:
    "Read the terms and conditions for ghostwriting, editing, publishing, cover design, and marketing services from The Readsy Publishers.",
  path: PATH,
});

export default function Terms() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: PATH },
        ])}
      />
      <Header />
      <main className="flex-1">
        <TermsPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
