import type { Metadata } from "next";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProfilePage } from "@/components/ProfilePage";
import { QuoteModal } from "@/components/QuoteModal";

export const metadata: Metadata = {
  title: "My Profile | The Readsy Publishers",
  robots: { index: false, follow: false },
};

export default function Profile() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ProfilePage />
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
