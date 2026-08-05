"use client";

import { TRUST_NAMES } from "@/lib/content";

export function TrustBar() {
  const items = [...TRUST_NAMES, ...TRUST_NAMES];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-navy py-5">
      <div className="mx-auto mb-3 max-w-6xl px-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:px-6 sm:text-left">
        Trusted across leading platforms
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap px-6">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-lg font-semibold tracking-wide text-white/75 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
