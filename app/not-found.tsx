import type { Metadata } from "next";
import Link from "@/components/Link";
import { BookX } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteModal } from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found | The Readsy Publishers",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
  other: { publisher: "The Readsy Publishers" },
};

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/cover-generator", label: "AI Cover Generator" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#f3f6f9] py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 88% 10%, rgba(11,31,58,0.06), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 grain opacity-30" />

          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-bright text-white shadow-lg shadow-sky/25">
              <BookX className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <p className="mt-6 font-display text-7xl font-bold tracking-tight text-navy sm:text-8xl">
              404
            </p>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              This page hasn&apos;t been written yet
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
              Here are a few places to pick the story back up.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>

            <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-muted-border bg-white p-6 text-left shadow-[0_18px_40px_-32px_rgba(11,31,58,0.35)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
                Popular pages
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-muted-border bg-muted/40 px-3.5 py-1.5 text-xs font-semibold text-navy transition hover:border-sky/40 hover:bg-sky-soft hover:text-sky"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
                Our services
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PRICING_PLANS.map((plan) => (
                  <Link
                    key={plan.id}
                    href={`/services/${plan.id}`}
                    className="truncate rounded-xl px-2.5 py-2 text-xs font-medium text-text-muted transition hover:bg-sky-soft hover:text-sky"
                  >
                    {plan.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <QuoteModal autoOpen={false} />
      <ChatWidget />
    </>
  );
}
