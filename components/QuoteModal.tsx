"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { QuoteFormFields } from "./QuoteFormFields";
import { useQuote } from "./QuoteProvider";

export function QuoteModal() {
  const { isOpen, openQuote, closeQuote } = useQuote();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Auto-open on every visit. Do NOT gate with a ref that survives
  // Strict Mode cleanup — that cancels the timer and blocks reopen.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      openQuote();
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [openQuote]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuote();
    };
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeQuote]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          role="presentation"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-deep/75 backdrop-blur-[4px]"
            aria-label="Close quote form"
            onClick={closeQuote}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid w-full max-w-[960px] overflow-hidden rounded-3xl bg-white shadow-[0_40px_120px_-40px_rgba(20,29,41,0.75)] outline-none md:grid-cols-[1.05fr_0.95fr] md:items-stretch"
          >
            <button
              type="button"
              onClick={closeQuote}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy/80 text-white shadow-sm transition hover:bg-navy md:bg-white/95 md:text-navy md:hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>

            {/* Original promo art — panel bg white; image file unchanged */}
            <div className="relative hidden min-h-[34rem] border-r border-navy/15 !bg-white md:block">
              <div className="absolute inset-3">
                <Image
                  src="/images/modal-image/Modal-image.png"
                  alt="Readsy 50 percent off publishing offer"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 960px) 100vw, 500px"
                  priority
                />
              </div>
            </div>

            <div className="relative flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9">
              <Image
                src="/images/logo.svg"
                alt="The Readsy"
                width={140}
                height={55}
                className="mb-4 h-9 w-auto md:hidden"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">
                Free consultation
              </p>
              <h2
                id="quote-modal-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]"
              >
                Get a Free Quote
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Tell us about your book. We will respond with a clear next step
                for writing, editing, design, publishing, or marketing.
              </p>
              <div className="mt-5">
                <QuoteFormFields idPrefix="modal" source="quote-modal" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
