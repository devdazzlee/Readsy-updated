"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Lightbulb,
  LayoutGrid,
  Mic,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRelatedServices, getServiceDetail } from "@/lib/serviceDetails";
import { fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { useChat } from "../ChatProvider";
import { useQuote } from "../QuoteProvider";
import { StudioCta } from "../StudioCta";
import {
  Breadcrumb,
  DeliverablesBanner,
  FaqBlock,
  ProcessStepper,
  RelatedServices,
  SubServicesGrid,
} from "./shared";

const service = getServiceDetail("book-writing")!;
const related = getRelatedServices("book-writing");
const BENEFIT_ICONS = [Lightbulb, LayoutGrid, Mic, Calendar];

const OUTLINE_PREVIEW = [
  "Chapter 1 — The premise that started it all",
  "Chapter 2 — Establishing your reader's stakes",
  "Chapter 3 — The turning point",
  "Chapter 4 — Raising the tension",
  "Chapter 5 — The payoff",
];

export function BookWritingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — split, image left, torn-paper frame */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 10% 85%, rgba(11,31,58,0.06), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rotate-2 rounded-[1.75rem] border-2 border-dashed border-sky/30" />
            <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_90px_-35px_rgba(11,31,58,0.5)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/services/book-writing-hero.jpg"
                  alt="Author developing a manuscript from concept to draft"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Breadcrumb label="Book Writing" />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 max-w-lg font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl"
            >
              Book Writing
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
              {service.heroSubtext}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-navy">{service.price}</span>
              <span className="text-sm text-text-muted">{service.unit} · starting price</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" onClick={openQuote}>
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="navy" size="lg" onClick={openChat}>
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Ask a Specialist
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SubServicesGrid
        title="Book Writing services with The Readsy Publishers"
        intro="Every book needs a different kind of writer. Here's the range our team covers."
        items={service.subServices}
      />

      {/* Signature block: outline / table of contents mock */}
      <MotionSection className="bg-muted">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
          <MotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              Before we write a word
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Every book starts with a real outline
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
              No guessing chapter to chapter. We map your book's full arc
              before drafting begins, so structure is locked in early and
              nothing has to be rewritten later.
            </p>
          </MotionItem>
          <MotionItem>
            <div className="rounded-2xl border border-muted-border bg-white p-6 shadow-[0_24px_60px_-40px_rgba(11,31,58,0.35)] sm:p-8">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-sky">
                Table of Contents — Draft
              </p>
              <ol className="mt-5 space-y-3.5">
                {OUTLINE_PREVIEW.map((line, i) => (
                  <li key={line} className="flex items-baseline gap-3 border-b border-muted-border pb-3 last:border-0">
                    <span className="font-display text-sm text-sky">{i + 1}</span>
                    <span className="text-sm text-navy">{line}</span>
                  </li>
                ))}
              </ol>
            </div>
          </MotionItem>
        </div>
      </MotionSection>

      {/* Benefits — 2x2 numbered grid */}
      <MotionSection className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Structured writing, start to finish
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Lightbulb;
              return (
                <MotionItem key={item.title}>
                  <article className="flex h-full gap-5 rounded-2xl border border-muted-border bg-white p-6">
                    <span className="font-display text-4xl font-bold text-sky/25">0{i + 1}</span>
                    <div>
                      <Icon className="h-5 w-5 text-sky" strokeWidth={1.75} />
                      <h3 className="mt-3 font-display text-base font-semibold text-navy">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.text}</p>
                    </div>
                  </article>
                </MotionItem>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <ProcessStepper title="From concept to finished draft" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/book-writing-secondary.jpg"
        imageAlt="Manuscript pages taking shape"
        eyebrow={service.tagline}
        heading="Every book starts"
        headingAccent="with a first page."
        subtext="A structured writing process, a dedicated coach, and weekly check-ins so your idea actually becomes a finished manuscript."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Start writing your book"
        panelText="Share your idea — we'll map the plan to a finished draft."
      />
    </div>
  );
}
