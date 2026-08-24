"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck, MessageCircle, Paintbrush, Palette, RefreshCw } from "lucide-react";
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

const service = getServiceDetail("childrens-book-illustrations")!;
const BENEFIT_ICONS = [Palette, Paintbrush, RefreshCw, FileCheck];

export function ChildrensBookIllustrationsPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — gallery-wall style overlapping frames */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 88% 12%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}><Breadcrumb label="Children's Book Illustrations" /></motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl">
              Children&apos;s Book Illustrations
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

          <div className="relative mx-auto h-[22rem] w-full max-w-sm sm:h-[26rem]">
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 30 }}
              animate={{ opacity: 1, rotate: -6, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-4 w-[70%] overflow-hidden rounded-xl border-8 border-white shadow-[0_30px_70px_-30px_rgba(11,31,58,0.5)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/services/childrens-book-illustrations-hero.jpg"
                  alt="Illustrator sketching colorful character art"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 60vw, 25vw"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: 8, y: 30 }}
              animate={{ opacity: 1, rotate: 5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-2 right-0 w-[65%] overflow-hidden rounded-xl border-8 border-white shadow-[0_30px_70px_-30px_rgba(11,31,58,0.5)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/services/childrens-book-illustrations-secondary.jpg"
                  alt="Watercolor art supplies and paint palette"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 55vw, 22vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SubServicesGrid
        title="Illustration services with The Readsy Publishers"
        intro="Original art built around your story, from first sketch to print-ready files."
        items={service.subServices}
      />

      {/* Benefits */}
      <MotionSection className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Original art, made for your story
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Palette;
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

      <ProcessStepper title="From sketch to final art" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <StudioCta
        image="/images/services/childrens-book-illustrations-hero.jpg"
        imageAlt="Illustrator at work on children's book art"
        eyebrow={service.tagline}
        heading="See your characters"
        headingAccent="drawn exactly as you imagined them."
        subtext="Original character design and full-book illustration, developed through style sketches you approve before final art begins."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Start your illustration project"
        panelText="Share your story — we'll sketch the first character options."
      />
    </div>
  );
}
