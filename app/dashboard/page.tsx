import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { DashboardPage } from "@/components/DashboardPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "Dashboard | The Readsy Publishers",
  robots: { index: false, follow: false },
};

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <DashboardPage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
