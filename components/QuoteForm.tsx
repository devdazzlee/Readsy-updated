"use client";

import Image from "next/image";
import { QuoteFormFields } from "./QuoteFormFields";
import { MotionItem, MotionSection } from "@/lib/motion";

export function QuoteForm() {
  return (
    <MotionSection id="quote" className="scroll-mt-24 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/sections/open-book.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-sky-soft/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <MotionItem>
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 px-5 py-10 shadow-[0_30px_80px_-40px_rgba(11,31,58,0.45)] backdrop-blur sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
                Let&apos;s begin
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Request a Free Quote
              </h2>
              <p className="mt-2 text-sm text-text-muted sm:text-base">
                Share a few details and we will follow up with next steps for
                your project.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl">
              <QuoteFormFields idPrefix="footer" compact source="footer-quote" />
            </div>
          </div>
        </MotionItem>
      </div>
    </MotionSection>
  );
}
