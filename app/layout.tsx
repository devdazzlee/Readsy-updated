import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { ChatProvider } from "@/components/ChatProvider";
import { QuoteProvider } from "@/components/QuoteProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Readsy Publishers | Ghostwriting, Publishing & Book Marketing",
  description:
    "Turn your story into a published masterpiece. Professional ghostwriting, editing, publishing, cover design, and book marketing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-navy font-sans">
        <QuoteProvider>
          <ChatProvider>{children}</ChatProvider>
        </QuoteProvider>
      </body>
    </html>
  );
}
