import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PrivacyPage } from "@/components/PrivacyPage";
import { QuoteModal } from "@/components/QuoteModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/privacy";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | The Readsy Publishers",
  description:
    "Learn how The Readsy Publishers collects, uses, and protects your information, including our SMS messaging terms and conditions.",
  path: PATH,
});

export default function Privacy() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: PATH },
        ])}
      />
      <Header />
      <main className="flex-1">
        <PrivacyPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
