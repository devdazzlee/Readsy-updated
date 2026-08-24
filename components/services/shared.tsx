"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionItem, MotionSection } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
        tone === "light"
          ? "border border-muted-border bg-white text-navy"
          : "border border-white/20 bg-white/10 text-white backdrop-blur",
      )}
    >
      {children}
    </span>
  );
}

export function FaqAccordionItem({
  question,
  answer,
  tone = "light",
}: {
  question: string;
  answer: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition",
        dark
          ? open
            ? "border-sky-bright/30 bg-white/10"
            : "border-white/12 bg-white/5 hover:border-sky-bright/25"
          : open
            ? "border-sky/30 bg-sky-soft/40"
            : "border-muted-border bg-muted/40 hover:border-sky/25",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold",
          dark ? "text-white" : "text-navy",
        )}
        aria-expanded={open}
      >
        {question}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition",
            dark
              ? open
                ? "bg-sky-bright text-navy"
                : "bg-white/10 text-white"
              : open
                ? "bg-sky text-white"
                : "bg-navy/5 text-navy",
          )}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "px-5 pb-4 text-sm leading-relaxed",
                dark ? "text-white/65" : "text-text-muted",
              )}
            >
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SubServicesGrid({
  title,
  intro,
  items,
  eyebrow = "What we offer",
}: {
  title: string;
  intro: string;
  items: { title: string; text: string }[];
  eyebrow?: string;
}) {
  return (
    <MotionSection className="relative overflow-hidden bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
            {intro}
          </p>
        </MotionItem>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionItem key={item.title}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-muted-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-sky/35 hover:shadow-[0_24px_50px_-32px_rgba(11,31,58,0.4)]">
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-7xl font-bold text-navy/[0.05] transition group-hover:text-sky/10">
                  0{i + 1}
                </span>
                <h3 className="relative font-display text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-text-muted">
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

export function ProcessStepper({
  title,
  eyebrow = "The process",
  steps,
}: {
  title: string;
  eyebrow?: string;
  steps: { step: string; title: string; text: string }[];
}) {
  return (
    <MotionSection className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {title}
          </h2>
        </MotionItem>

        <div className="relative mt-20 hidden sm:block">
          <div className="absolute left-0 right-0 top-8 h-px bg-muted-border" />
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {steps.map((item) => (
              <MotionItem key={item.step} className="relative text-center">
                <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface bg-sky font-display text-lg font-bold text-white shadow-md shadow-sky/25">
                  {item.step}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </MotionItem>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-7 sm:hidden">
          {steps.map((item) => (
            <MotionItem key={item.step} className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky font-display text-base font-bold text-white">
                {item.step}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-text-muted">{item.text}</p>
              </div>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export function DeliverablesBanner({
  statValue,
  statLabel,
  deliverables,
  onQuote,
  bg = "bg-navy-deep",
}: {
  statValue: string;
  statLabel: string;
  deliverables: string[];
  onQuote: () => void;
  bg?: string;
}) {
  return (
    <MotionSection className={cn("relative overflow-hidden text-white", bg)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(43,184,240,0.22), transparent 40%), radial-gradient(circle at 90% 0%, rgba(43,184,240,0.12), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-20" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
        <MotionItem className="relative">
          <div className="absolute -inset-10 rounded-full bg-sky-bright/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-bright">
              By the numbers
            </span>
            <p className="mt-5 font-display text-7xl font-bold leading-none text-white sm:text-8xl">
              {statValue}
            </p>
            <p className="mt-3 max-w-[14rem] text-base text-white/60">{statLabel}</p>
          </div>
        </MotionItem>

        <MotionItem>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-bright">
            You'll receive
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Everything included, nothing hidden
          </h3>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <li
                key={item}
                className="group flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-sm text-white/85 backdrop-blur-sm transition duration-300 hover:border-sky-bright/40 hover:bg-white/[0.08]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-bright/15 text-sky-bright transition group-hover:bg-sky-bright group-hover:text-navy">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Button variant="primary" className="mt-8" onClick={onQuote}>
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

export function FaqBlock({
  faqs,
  tone = "light",
}: {
  faqs: { q: string; a: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <MotionSection className={dark ? "bg-navy" : "bg-surface"}>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="text-center">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.18em]",
              dark ? "text-sky-bright" : "text-sky",
            )}
          >
            Common questions
          </p>
          <h2
            className={cn(
              "mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl",
              dark ? "text-white" : "text-navy",
            )}
          >
            Frequently asked questions
          </h2>
        </MotionItem>
        <MotionItem className="mt-10 space-y-3">
          {faqs.map((item) => (
            <FaqAccordionItem key={item.q} question={item.q} answer={item.a} tone={tone} />
          ))}
        </MotionItem>
        <MotionItem className="mt-10 text-center">
          <Link
            href="/pricing"
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold transition",
              dark ? "text-sky-bright hover:text-white" : "text-sky hover:text-sky-bright",
            )}
          >
            Compare all services & pricing
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

export function Breadcrumb({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs",
        dark ? "text-white/50" : "text-text-muted",
      )}
    >
      <Link href="/" className={cn("transition", dark ? "hover:text-white" : "hover:text-navy")}>
        Home
      </Link>
      <span>/</span>
      <Link href="/pricing" className={cn("transition", dark ? "hover:text-white" : "hover:text-navy")}>
        Services
      </Link>
      <span>/</span>
      <span className={dark ? "text-white" : "text-navy"}>{label}</span>
    </div>
  );
}
