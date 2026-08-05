"use client";

import Image from "next/image";
import { PROCESS_STEPS } from "@/lib/content";
import { MotionItem, MotionSection } from "@/lib/motion";

export function ProcessSection() {
  return (
    <MotionSection
      id="process"
      className="scroll-mt-24 relative overflow-hidden bg-navy text-white"
    >
      <Image
        src="/images/sections/library.jpg"
        alt="Library shelves"
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy/85 to-navy-deep/95" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-bright">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A clear path from idea to published author
          </h2>
          <p className="mt-3 text-base text-white/70">
            Four focused stages. One team walking with you the entire way.
          </p>
        </MotionItem>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <MotionItem key={item.step}>
              <article className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:bg-white/15">
                <span className="font-display text-3xl font-bold text-sky-bright">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </article>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
