"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Ghost,
  Megaphone,
  MessageCircle,
  Newspaper,
  Palette,
  PenLine,
  PenTool,
  Plus,
  Rocket,
  Sparkles,
  Tablet,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_FAQS, PRICING_PLANS } from "@/lib/content";
import { fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";
import { StudioCta } from "./StudioCta";
import { Testimonials } from "./Testimonials";
import { TrustBar } from "./TrustBar";

const ICONS: Record<string, typeof BookOpen> = {
  "ghost-writing": Ghost,
  "book-writing": PenLine,
  "book-editing": PenTool,
  "book-proofreading": ClipboardCheck,
  "book-publishing": BookOpen,
  "book-marketing": Megaphone,
  "book-promotion": TrendingUp,
  "digital-marketing": Rocket,
  "childrens-book-publication": Sparkles,
  "childrens-book-illustrations": Palette,
  "article-publication": Newspaper,
  "ebook-writing": Tablet,
};

export function PricingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PricingGridSection />
      <TrustBar />
      <Testimonials />
      <FaqSection />
      <StudioCta
        image="/images/sections/pricing-cta.jpg"
        imageAlt="Planning a publishing project over coffee"
        eyebrow="Still comparing options?"
        heading="Get a number,"
        headingAccent="not a guessing game."
        subtext="Every price on this page is a starting point. Talk to a specialist for 15 minutes and leave with an exact quote for your book."
        bullets={[
          "No hidden fees",
          "Flexible payment plans",
          "Bundle & save across services",
          "Free consultation included",
        ]}
        panelTitle="Get your custom quote"
        panelText="A specialist confirms exact pricing after a short call."
      />
    </div>
  );
}

function HeroSection() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-[#f3f6f9]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 88% 12%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-sky/20 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-navy/10 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 bg-sky-soft/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            Simple, transparent pricing
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            One studio. Every stage of your book.{" "}
            <span className="text-sky">Priced clearly.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            From your first draft to a full marketing launch, every service
            below shows a starting price — no hidden fees, no surprise
            add-ons. Need something custom? We&apos;ll build a package
            around your book.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#pricing-grid">
              <Button variant="primary" size="lg">
                See pricing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <Button variant="navy" size="lg" onClick={openChat}>
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Ask about pricing
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-muted-border pt-6 text-sm text-text-muted"
          >
            <span>No hidden fees</span>
            <span>Free initial consultation</span>
            <span>Flexible payment plans</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-sky/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <Image
                src="/images/sections/pricing-hero-notebook.jpg"
                alt="Open notebook and pen ready for planning your book project"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/5 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              No hidden fees
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
            >
              <p className="font-display text-2xl font-bold text-white">
                {PRICING_PLANS.length}+
              </p>
              <p className="mt-0.5 text-xs text-white/70">
                services, one studio
              </p>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                <p className="font-display text-lg font-semibold text-white">
                  Starting at just $299
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Every project begins with a free consultation to map the
                  right plan and price for your book.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingGridSection() {
  const { openQuote } = useQuote();

  return (
    <MotionSection
      id="pricing-grid"
      className="scroll-mt-24 relative overflow-hidden bg-gradient-to-b from-surface via-sky-soft/40 to-surface"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-sky/15 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-navy/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.15]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Our services
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Every service, one clear starting price
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Prices shown are starting points — your specialist will confirm
            an exact quote after a free consultation about your book.
          </p>
        </MotionItem>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => {
            const Icon = ICONS[plan.id] ?? BookOpen;
            return (
              <MotionItem
                key={plan.id}
                id={plan.id}
                variants={fadeUp}
                className={cn(
                  "group relative flex h-full scroll-mt-28 flex-col rounded-2xl border bg-white p-7 transition duration-300 hover:-translate-y-1.5",
                  plan.popular
                    ? "border-sky/40 shadow-[0_30px_70px_-32px_rgba(29,169,224,0.45)]"
                    : "border-muted-border shadow-[0_20px_50px_-40px_rgba(11,31,58,0.35)] hover:border-sky/30 hover:shadow-[0_24px_50px_-32px_rgba(11,31,58,0.4)]",
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-navy px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
                    Most popular
                  </span>
                ) : null}

                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition duration-300 group-hover:scale-105",
                      plan.popular
                        ? "bg-gradient-to-br from-sky to-sky-bright shadow-sky/30"
                        : "bg-navy shadow-navy/20",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-xs font-semibold text-sky/40">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                  {plan.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    Starting at
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold text-navy">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-muted">{plan.unit}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-navy/85"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                        strokeWidth={2.25}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="mt-7 w-full"
                  onClick={openQuote}
                >
                  Get a Free Quote
                </Button>
                <Link
                  href={`/services/${plan.id}`}
                  className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-sky transition hover:text-sky-bright"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </MotionItem>
            );
          })}

          <MotionItem
            variants={fadeUp}
            className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-sky/40 bg-sky-soft/40 p-7 text-center"
          >
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-md shadow-navy/20">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-navy">
              Need something else?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Article publication, e-books, or a fully bundled package —
              tell us your goal and we&apos;ll build a custom plan around it.
            </p>
            <Button variant="navy" className="mt-6 w-full" onClick={openQuote}>
              Talk to a Specialist
            </Button>
          </MotionItem>
        </div>
      </div>
    </MotionSection>
  );
}

function FaqSection() {
  return (
    <MotionSection id="pricing-faq" className="scroll-mt-24 bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Pricing questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-text-muted">
            Still not sure what fits your budget? Ask us directly and we will
            walk you through the numbers.
          </p>
        </MotionItem>

        <MotionItem className="mt-10 space-y-3">
          {PRICING_FAQS.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-muted/40 transition",
        open ? "border-sky/30 bg-sky-soft/40" : "border-muted-border hover:border-sky/25",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy"
        aria-expanded={open}
      >
        {question}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition",
            open ? "bg-sky text-white" : "bg-navy/5 text-navy",
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
            <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
