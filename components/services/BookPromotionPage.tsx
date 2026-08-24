"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Gift,
  Mail,
  Megaphone,
  MessageCircle,
  Newspaper,
  TrendingUp,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServiceDetail } from "@/lib/serviceDetails";
import { fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { useChat } from "../ChatProvider";
import { useQuote } from "../QuoteProvider";
import { StudioCta } from "../StudioCta";
import {
  Breadcrumb,
  DeliverablesBanner,
  FaqBlock,
  ProcessStepper,
  SubServicesGrid,
} from "./shared";

const service = getServiceDetail("book-promotion")!;
const BENEFIT_ICONS = [TrendingUp, Mail, Megaphone, BarChart3];

const CHANNELS = [
  { icon: TrendingUp, label: "Bestseller Lists" },
  { icon: Mail, label: "Newsletters" },
  { icon: Users2, label: "Reader Communities" },
  { icon: Megaphone, label: "Social Media" },
  { icon: Newspaper, label: "Blog Tours" },
  { icon: Gift, label: "Giveaways" },
];

export function BookPromotionPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — full-bleed */}
      <section className="relative overflow-hidden bg-navy-deep">
        <Image
          src="/images/services/book-promotion-hero.jpg"
          alt="Author at a bookstore promotional event"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/75 via-navy-deep/88 to-navy-deep" />
        <div className="pointer-events-none absolute inset-0 grain opacity-20" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 sm:py-32"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Breadcrumb label="Book Promotion" tone="dark" />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky-bright">
            {service.tagline}
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Book Promotion
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {service.heroSubtext}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" onClick={openQuote}>
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={openChat}
              className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Ask a Specialist
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-6 text-sm text-white/60">
            <span className="font-display text-2xl font-bold text-white">{service.price}</span>
            <span>{service.unit}</span>
            <span className="h-4 w-px bg-white/20" />
            <span>{service.stat.value} {service.stat.label}</span>
          </motion.div>
        </motion.div>
      </section>

      <SubServicesGrid
        title="Book Promotion services with The Readsy Publishers"
        intro="Momentum doesn't end on launch day. Here's how we keep your book in front of readers."
        items={service.subServices}
      />

      {/* Signature: channel grid */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Where you'll show up</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {service.stat.value} promo channels, one campaign
            </h2>
          </MotionItem>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CHANNELS.map((c) => (
              <MotionItem key={c.label}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-muted-border bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-sky/35">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-soft text-sky">
                    <c.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="font-display text-sm font-semibold text-navy">{c.label}</p>
                </div>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Benefits */}
      <MotionSection className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A coordinated push, start to finish
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Megaphone;
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

      <ProcessStepper title="From planning to performance report" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <StudioCta
        image="/images/services/book-promotion-secondary.jpg"
        imageAlt="Readers browsing at a bookstore event"
        eyebrow={service.tagline}
        heading="Keep readers finding"
        headingAccent="your book long after launch week."
        subtext="A coordinated push across newsletters, social, and reader communities designed to build lasting momentum."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Book your promotion campaign"
        panelText="Tell us your goal — we'll match the right channels."
      />
    </div>
  );
}
