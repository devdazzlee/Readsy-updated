"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function Header() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-navy/8 bg-white/95 shadow-[0_10px_40px_-24px_rgba(20,29,41,0.35)] backdrop-blur-xl"
          : "border-b border-navy/5 bg-white",
      )}
    >
      <div className="mx-auto grid h-[4.75rem] w-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0 justify-self-start" aria-label="Readsy home">
          <Image
            src="/images/logo.svg"
            alt="The Readsy"
            width={210}
            height={82}
            className="h-11 w-auto sm:h-12 lg:h-[3.25rem]"
            priority
          />
        </Link>

        <nav className="hidden justify-self-center lg:flex lg:items-center lg:gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium text-text-muted transition hover:text-navy xl:px-3"
            >
              {link.label}
              <span className="absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-sky transition duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <a
            href="tel:+17373945403"
            className="mr-1 hidden items-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium text-navy/70 transition hover:text-navy xl:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-sky" strokeWidth={1.75} />
            <span className="tabular-nums">+1 737 394 5403</span>
          </a>
          <Button
            variant="navy"
            size="sm"
            onClick={openQuote}
            className="hidden rounded-full px-4 sm:inline-flex lg:px-5"
          >
            Get a Quote
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={openChat}
            className="hidden rounded-full px-4 shadow-sky/30 sm:inline-flex lg:px-5"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Live Chat
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-navy/8 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-sky-soft"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+17373945403"
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-sky-soft"
              >
                <Phone className="h-4 w-4 text-sky" strokeWidth={1.75} />
                +1 737 394 5403
              </a>
              <div className="mt-3 grid gap-2 border-t border-navy/8 pt-3">
                <Button
                  variant="navy"
                  className="rounded-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openQuote();
                  }}
                >
                  Get a Quote
                </Button>
                <Button
                  variant="primary"
                  className="rounded-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openChat();
                  }}
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  Live Chat
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
