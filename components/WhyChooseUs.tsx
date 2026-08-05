"use client";

import Image from "next/image";
import { ShieldCheck, Clock3, Users, Lock } from "lucide-react";
import { WHY_POINTS } from "@/lib/content";
import { MotionItem, MotionSection } from "@/lib/motion";

const ICONS = [Users, Clock3, ShieldCheck, Lock];

export function WhyChooseUs() {
  return (
    <MotionSection id="why-us" className="scroll-mt-24 bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <MotionItem>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Why Readsy
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Why authors choose Readsy
          </h2>
          <p className="mt-3 max-w-md text-base text-text-muted">
            A partner that stays with your manuscript from the first outline to
            the final launch campaign.
          </p>
          <ol className="mt-8 space-y-4">
            {WHY_POINTS.map((item, index) => {
              const Icon = ICONS[index];
              return (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-muted-border bg-muted/50 p-4 transition hover:border-sky/30 hover:bg-sky-soft/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {item.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </MotionItem>

        <MotionItem className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-sky/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
            <Image
              src="/images/sections/books-stack.jpg"
              alt="Stack of published books"
              width={900}
              height={700}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-3 p-5">
              {[
                "Expert Writers",
                "On-time Delivery",
                "Full Privacy",
                "Client Care",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/20 bg-white/15 px-3 py-3 text-center text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </MotionItem>
      </div>
    </MotionSection>
  );
}
