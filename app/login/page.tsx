import type { Metadata } from "next";
import { Suspense } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LoginPage } from "@/components/LoginPage";
import { QuoteModal } from "@/components/QuoteModal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Log In | The Readsy Publishers",
  description: "Log in to your The Readsy Publishers account.",
  path: "/login",
  noIndex: true,
});

export default function Login() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <LoginPage />
        </Suspense>
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
