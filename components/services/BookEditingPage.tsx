"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Layers, MessageCircle, PenTool, Search } from "lucide-react";
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

const service = getServiceDetail("book-editing")!;
const BENEFIT_ICONS = [Layers, PenTool, Search];

export function BookEditingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — split, image right */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 88% 12%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Breadcrumb label="Book Editing" />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              Book Editing
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
                  src="/images/services/book-editing-hero.jpg"
                  alt="Editor marking up a manuscript"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/5 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SubServicesGrid
        title="Book Editing services with The Readsy Publishers"
        intro="Review the range of editing our team offers to authors, from a first honest read to a polished final pass."
        items={service.subServices}
      />

      {/* Signature block: live markup comparison */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">See the difference</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Every sentence, sharpened
            </h2>
          </MotionItem>

          <MotionItem className="mt-12 overflow-hidden rounded-2xl border border-muted-border bg-white shadow-[0_30px_70px_-40px_rgba(11,31,58,0.35)]">
            <div className="flex items-center gap-2 border-b border-muted-border bg-muted/60 px-6 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-xs font-medium text-text-muted">manuscript_ch01_tracked.docx</span>
            </div>
            <p className="p-7 font-display text-lg leading-loose text-navy sm:p-9 sm:text-xl">
              She{" "}
              <span className="text-red-400 line-through decoration-2">walked really fast, almost like running,</span>{" "}
              <span className="rounded bg-sky-soft px-1.5 py-0.5 text-navy">
                moved fast enough that it was almost a run,
              </span>{" "}
              down the{" "}
              <span className="text-red-400 line-through decoration-2">street that was very quiet and empty</span>{" "}
              <span className="rounded bg-sky-soft px-1.5 py-0.5 text-navy">empty, silent street</span>, her{" "}
              <span className="text-red-400 line-through decoration-2">breath coming out in little clouds</span>{" "}
              <span className="rounded bg-sky-soft px-1.5 py-0.5 text-navy">breath fogging in front of her</span>.
            </p>
          </MotionItem>
        </div>
      </MotionSection>

      {/* Benefits — horizontal strip on navy */}
      <MotionSection className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 grain opacity-20" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-bright">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Three editing passes, one editor
            </h2>
          </MotionItem>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {service.benefits.slice(0, 3).map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Layers;
              return (
                <MotionItem key={item.title}>
                  <article className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:bg-white/15">
                    <Icon className="h-6 w-6 text-sky-bright" strokeWidth={1.75} />
                    <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
                  </article>
                </MotionItem>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <ProcessStepper title="From raw draft to ready-to-print" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
        bg="bg-navy"
      />

      <FaqBlock faqs={service.faqs} />

      <StudioCta
        image="/images/services/book-editing-secondary.jpg"
        imageAlt="Editing markup on a manuscript"
        eyebrow={service.tagline}
        heading="Good writing"
        headingAccent="becomes great with the right editor."
        subtext="Three editing passes, one dedicated editor, and a style sheet that keeps every chapter consistent."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Get your manuscript edited"
        panelText="Send your draft — a specialist scopes the edit within a day."
      />
    </div>
  );
}
