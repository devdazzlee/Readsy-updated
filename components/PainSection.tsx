"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAIN_POINTS } from "@/lib/content";
import { MotionItem, MotionSection } from "@/lib/motion";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function PainSection() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <MotionSection className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <MotionItem className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.55)] sm:aspect-[5/6]">
            <Image
              src="/images/sections/writing-desk.jpg"
              alt="Writer working on a manuscript"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md">
              <p className="font-display text-lg font-semibold text-white">
                Stuck between idea and finished book?
              </p>
              <p className="mt-1 text-sm text-white/75">
                Most authors are. The Readsy Publishers closes that gap.
              </p>
            </div>
          </div>
        </MotionItem>

        <MotionItem>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            The author struggle
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            Are you struggling to give words to your ideas?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
            Inspiration is easy. Finishing, polishing, publishing, and marketing
            is where most stories stall. You are not alone, and you do not have
            to figure it out alone either.
          </p>
          <ul className="mt-8 space-y-3.5">
            {PAIN_POINTS.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-xl border border-muted-border bg-muted/60 px-4 py-3 text-sm text-navy sm:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={openQuote}>Get a Free Quote</Button>
            <Button variant="navy" onClick={openChat}>
              Talk to an Expert
            </Button>
          </div>
        </MotionItem>
      </div>
    </MotionSection>
  );
}
