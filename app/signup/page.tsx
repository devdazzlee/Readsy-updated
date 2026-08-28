import type { Metadata } from "next";
import { Suspense } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { SignupPage } from "@/components/SignupPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Create Account | The Readsy Publishers",
  description: "Create a free account to use the AI Cover Generator and more.",
  path: "/signup",
  noIndex: true,
});

export default function Signup() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <SignupPage />
        </Suspense>
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
