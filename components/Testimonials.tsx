"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/content";
import { MotionItem, MotionSection } from "@/lib/motion";

export function Testimonials() {
  return (
    <MotionSection
      id="testimonials"
      className="scroll-mt-24 bg-muted"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Social proof
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Authors who trusted The Readsy Publishers
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Real feedback from writers who went from idea to published book with
            our team.
          </p>
        </MotionItem>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <MotionItem key={item.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-muted-border bg-white p-7 shadow-[0_20px_50px_-40px_rgba(11,31,58,0.35)] transition duration-500 hover:-translate-y-1">
                <Quote className="h-8 w-8 text-sky/40" />
                <div className="mt-3 flex gap-0.5 text-sky" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.6l1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-muted-border pt-5">
                  <span className="relative inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-sky/20">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy">
                      {item.name}
                    </span>
                    <span className="block text-xs text-text-muted">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
