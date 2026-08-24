"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck, Globe, Layout, MessageCircle, Users2 } from "lucide-react";
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

const service = getServiceDetail("childrens-book-publication")!;
const BENEFIT_ICONS = [Layout, FileCheck, Globe, Users2];
const AGE_RANGES = ["Ages 0-2 · Board Books", "Ages 3-6 · Picture Books", "Ages 6-9 · Early Readers"];

export function ChildrensBookPublicationPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — split, playful blob */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, rgba(29,169,224,0.18), transparent 38%), radial-gradient(circle at 10% 90%, rgba(11,31,58,0.06), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}><Breadcrumb label="Children's Book Publication" /></motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl">
              Children&apos;s Book Publication
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
              {service.heroSubtext}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {AGE_RANGES.map((a) => (
                <span key={a} className="rounded-full border border-muted-border bg-white px-3.5 py-1.5 text-xs font-semibold text-navy">
                  {a}
                </span>
              ))}
            </motion.div>
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              aria-hidden
              className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-sky/20 to-sky-bright/10 blur-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                <Image
                  src="/images/services/childrens-book-publication-hero.jpg"
                  alt="Colorful children's books ready for young readers"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/5 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SubServicesGrid
        title="Children's Book Publication with The Readsy Publishers"
        intro="Formatted right for the age it's written for, from board books to early readers."
        items={service.subServices}
      />

      {/* Benefits — rounded pill cards */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Publishing made for young readers
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Layout;
              return (
                <MotionItem key={item.title}>
                  <article className="flex h-full items-start gap-4 rounded-[1.75rem] border border-muted-border bg-white p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky to-sky-bright text-white shadow-md shadow-sky/25">
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

      <ProcessStepper title="From manuscript to bookshelf" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <StudioCta
        image="/images/services/childrens-book-publication-secondary.jpg"
        imageAlt="A child reading a colorful picture book"
        eyebrow={service.tagline}
        heading="Give young readers"
        headingAccent="a book made just for them."
        subtext="Age-right formatting and retail listings that help your story find its way onto the right shelves and into the right hands."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Publish your children's book"
        panelText="Tell us the age range — we'll map the right format."
      />
    </div>
  );
}
