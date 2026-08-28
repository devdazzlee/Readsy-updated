"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, MessageCircle, Target, TrendingUp, Users } from "lucide-react";
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

const service = getServiceDetail("book-marketing")!;
const related = getRelatedServices("book-marketing");
const BENEFIT_ICONS = [Target, TrendingUp, Globe, Users];
const BARS = [28, 42, 35, 58, 71, 64, 89];

export function BookMarketingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — split, image left */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 10% 85%, rgba(11,31,58,0.06), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-sky/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                <Image
                  src="/images/services/book-marketing-hero.jpg"
                  alt="Team planning a book marketing campaign"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/5 to-transparent" />
              </div>
              <div className="absolute right-5 top-5 flex items-end gap-1 rounded-xl bg-white/15 p-3 backdrop-blur-md">
                {BARS.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="w-2 rounded-sm bg-sky-bright"
                    style={{ maxHeight: 56 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger} className="order-1 lg:order-2">
            <motion.div variants={fadeUp}><Breadcrumb label="Book Marketing" /></motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              Book Marketing
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
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
        title="Book Marketing services with The Readsy Publishers"
        intro="A strategy built around your genre and audience, not a copy-paste template."
        items={service.subServices}
      />

      {/* Benefits — 2-col */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A full strategy, not just a checklist
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Target;
              return (
                <MotionItem key={item.title}>
                  <article className="flex h-full items-start gap-4 rounded-2xl border border-muted-border bg-white p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-navy">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.text}</p>
                    </div>
                  </article>
                </MotionItem>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <ProcessStepper title="A launch built on strategy, not guesswork" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/book-marketing-secondary.jpg"
        imageAlt="Marketing team reviewing campaign results"
        eyebrow={service.tagline}
        heading="A launch strategy"
        headingAccent="built for your genre, not a template."
        subtext="Ad campaigns, outreach, and a landing page designed around who actually reads your kind of book."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Plan your book marketing"
        panelText="Tell us your launch date — we'll build the timeline."
      />
    </div>
  );
}
