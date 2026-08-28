"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck, Feather, Layout, MessageCircle, Tablet } from "lucide-react";
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

const service = getServiceDetail("ebook-writing")!;
const related = getRelatedServices("ebook-writing");
const BENEFIT_ICONS = [Layout, Feather, Tablet, FileCheck];
const FORMATS = ["EPUB", "PDF", "Kindle (MOBI)", "Apple Books"];

export function EbookWritingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — split, image left with format badges */}
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
                  src="/images/services/ebook-writing-hero.jpg"
                  alt="Reading an e-book on a tablet"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/5 to-transparent" />
              </div>
              <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
                {FORMATS.map((f) => (
                  <span key={f} className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger} className="order-1 lg:order-2">
            <motion.div variants={fadeUp}><Breadcrumb label="E-Book Writing" /></motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              E-Book Writing
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
        title="E-Book Writing services with The Readsy Publishers"
        intro="From lead magnets to full digital novels, structured and formatted for how people actually read today."
        items={service.subServices}
      />

      {/* Signature: device compatibility row */}
      <MotionSection className="bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 grain opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <MotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-bright">Reads well everywhere</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Tested across every device your readers use
            </h2>
          </MotionItem>
          <div className="mt-12 flex flex-wrap items-end justify-center gap-6">
            <MotionItem className="w-20 rounded-[1.4rem] border-4 border-white/15 bg-white/5 p-1.5">
              <div className="aspect-[9/16] rounded-[1rem] bg-gradient-to-br from-sky/30 to-navy-deep" />
            </MotionItem>
            <MotionItem className="w-36 rounded-[1.2rem] border-4 border-white/15 bg-white/5 p-1.5">
              <div className="aspect-[4/3] rounded-[0.8rem] bg-gradient-to-br from-sky/30 to-navy-deep" />
            </MotionItem>
            <MotionItem className="w-24 rounded-md border-4 border-white/15 bg-white/5 p-1.5">
              <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-sky/30 to-navy-deep" />
            </MotionItem>
          </div>
          <MotionItem className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-white/60">
            <span>Phone</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Tablet</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>E-reader</span>
          </MotionItem>
        </div>
      </MotionSection>

      {/* Benefits */}
      <MotionSection className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Written, formatted, ready to publish
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Layout;
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

      <ProcessStepper title="From outline to download-ready file" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/ebook-writing-secondary.jpg"
        imageAlt="Reading an e-book comfortably at home"
        eyebrow={service.tagline}
        heading="From outline"
        headingAccent="to download-ready, in weeks."
        subtext="A structured manuscript, formatted cleanly for Kindle, EPUB, and PDF, tested across the devices your readers actually use."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Start your e-book"
        panelText="Tell us your topic — we'll map the outline first."
      />
    </div>
  );
}
