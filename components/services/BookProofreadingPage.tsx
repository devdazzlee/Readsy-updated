"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Layout, MessageCircle, RefreshCw, Search } from "lucide-react";
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

const service = getServiceDetail("book-proofreading")!;
const related = getRelatedServices("book-proofreading");
const BENEFIT_ICONS = [Search, Layout, RefreshCw, Clock3];

const COUNTERS = [
  { value: "500+", label: "errors caught, on average" },
  { value: "2", label: "independent review passes" },
  { value: "5-7", label: "business day turnaround" },
];

export function BookProofreadingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — centered, watermark numeral */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(29,169,224,0.16), transparent 40%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none font-display text-[16rem] font-bold leading-none text-navy/[0.035] sm:text-[22rem]"
        >
          Aa
        </span>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Breadcrumb label="Book Proofreading" />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
            {service.tagline}
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
            Book Proofreading
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            {service.heroSubtext}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" onClick={openQuote}>
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="navy" size="lg" onClick={openChat}>
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Ask a Specialist
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 font-display text-2xl font-bold text-navy">
            {service.price}
            <span className="ml-2 text-sm font-normal text-text-muted">{service.unit} · starting price</span>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COUNTERS.map((c) => (
              <MotionItem
                key={c.label}
                className="rounded-2xl border border-white bg-white/80 p-6 text-center shadow-[0_18px_40px_-28px_rgba(11,31,58,0.4)] backdrop-blur"
              >
                <p className="font-display text-4xl font-bold text-sky">{c.value}</p>
                <p className="mt-1.5 text-sm text-text-muted">{c.label}</p>
              </MotionItem>
            ))}
          </div>
        </div>
      </section>

      <SubServicesGrid
        title="Book Proofreading services with The Readsy Publishers"
        intro="The final layer of quality control before your manuscript goes anywhere near print."
        items={service.subServices}
      />

      {/* Signature: typo caught mock */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Nothing slips through</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The kind of errors we catch
            </h2>
          </MotionItem>
          <MotionItem className="mt-12 rounded-2xl border border-muted-border bg-white p-8 shadow-[0_30px_70px_-40px_rgba(11,31,58,0.35)] sm:p-10">
            <p className="font-display text-xl leading-loose text-navy sm:text-2xl">
              The old lighthouse keeper hadn&apos;t{" "}
              <span className="relative inline-block">
                <span className="text-navy">spoke</span>
                <svg aria-hidden viewBox="0 0 60 10" className="absolute -bottom-1 left-0 h-2.5 w-full text-red-400" preserveAspectRatio="none">
                  <path d="M0 6 Q7 2 15 6 T30 6 T45 6 T60 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>{" "}
              to anyone in{" "}
              <span className="relative inline-block">
                <span className="text-navy">there</span>
                <svg aria-hidden viewBox="0 0 60 10" className="absolute -bottom-1 left-0 h-2.5 w-full text-red-400" preserveAspectRatio="none">
                  <path d="M0 6 Q7 2 15 6 T30 6 T45 6 T60 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>{" "}
              months, since the accident that took his{" "}
              <span className="relative inline-block">
                <span className="text-navy">brothers</span>
                <svg aria-hidden viewBox="0 0 70 10" className="absolute -bottom-1 left-0 h-2.5 w-full text-red-400" preserveAspectRatio="none">
                  <path d="M0 6 Q7 2 15 6 T30 6 T45 6 T60 6 T75 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>{" "}
              life.
            </p>
            <p className="mt-6 flex flex-wrap gap-2 text-xs text-text-muted">
              <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-500">spoke → spoken</span>
              <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-500">there → those</span>
              <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-500">brothers → brother&apos;s</span>
            </p>
          </MotionItem>
        </div>
      </MotionSection>

      {/* Benefits */}
      <MotionSection className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A meticulous, two-pass review
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Search;
              return (
                <MotionItem key={item.title}>
                  <article className="group flex h-full flex-col rounded-2xl border border-muted-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky/35 hover:shadow-[0_24px_50px_-32px_rgba(11,31,58,0.4)]">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-sky-bright text-white shadow-md shadow-sky/25 transition duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-base font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
                  </article>
                </MotionItem>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <ProcessStepper title="A clean, error-free manuscript" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/book-proofreading-secondary.jpg"
        imageAlt="Close review of a manuscript page"
        eyebrow={service.tagline}
        heading="Don't let a typo"
        headingAccent="be the first thing readers notice."
        subtext="Two independent review passes catch what spellcheck misses, delivered back to you in days, not weeks."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Get your manuscript proofed"
        panelText="Send your file — most turn around in 5-7 business days."
      />
    </div>
  );
}
