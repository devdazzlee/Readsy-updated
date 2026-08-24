"use client";

import {
  BookOpen,
  Feather,
  Megaphone,
  Newspaper,
  Palette,
  PenLine,
  Sparkles,
  Tablet,
} from "lucide-react";
import { SERVICES } from "@/lib/content";
import { MotionItem, MotionSection } from "@/lib/motion";

const ICONS = {
  "book-editing": PenLine,
  "book-writing": Feather,
  "book-publishing": BookOpen,
  "article-publication": Newspaper,
  "childrens-book-publication": Sparkles,
  "ebook-writing": Tablet,
  "childrens-book-illustrations": Palette,
  "book-marketing": Megaphone,
} as const;

export function ServicesGrid() {
  return (
    <MotionSection
      id="services"
      className="scroll-mt-24 relative overflow-hidden bg-muted"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-sky/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            The Readsy Publishers Author Services
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Our Comprehensive Services Include
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Everything you need to write, polish, publish, and promote your book
            without juggling five different vendors.
          </p>
        </MotionItem>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id];
            return (
              <MotionItem key={service.id}>
                <article
                  id={service.id}
                  className="group relative flex h-full scroll-mt-28 flex-col rounded-2xl border border-muted-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky/35 hover:shadow-[0_24px_50px_-32px_rgba(11,31,58,0.4)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-sky-bright text-white shadow-md shadow-sky/25 transition duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-xs font-semibold text-sky/40">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </article>
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
