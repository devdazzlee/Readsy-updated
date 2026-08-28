"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Heart,
  Mail,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Users2,
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

const service = getServiceDetail("digital-marketing")!;
const related = getRelatedServices("digital-marketing");
const BENEFIT_ICONS = [Megaphone, Mail, TrendingUp, BarChart3];

const DASHBOARD_TILES = [
  { icon: Users2, label: "Followers", value: "+2.4K", trend: "this month" },
  { icon: Heart, label: "Engagement", value: "+18%", trend: "vs last month" },
  { icon: Mail, label: "Open rate", value: "42%", trend: "email average" },
];

export function DigitalMarketingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — split, image right with floating dashboard */}
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
            <motion.div variants={fadeUp}><Breadcrumb label="Digital Marketing" /></motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              Digital Marketing
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
                  src="/images/services/digital-marketing-hero.jpg"
                  alt="Digital marketing analytics dashboard"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/5 to-transparent" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -12, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 hidden w-48 rounded-2xl border border-muted-border bg-white p-4 shadow-[0_20px_50px_-24px_rgba(11,31,58,0.45)] sm:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">This month</p>
              <div className="mt-2 space-y-2">
                {DASHBOARD_TILES.map((t) => (
                  <div key={t.label} className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-soft text-sky">
                      <t.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-navy">{t.value}</p>
                      <p className="text-[10px] text-text-muted">{t.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SubServicesGrid
        title="Digital Marketing services with The Readsy Publishers"
        intro="Ongoing presence that keeps your author brand growing between releases."
        items={service.subServices}
      />

      {/* Benefits */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">What's included</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A managed presence, not a one-off post
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

      <ProcessStepper title="A monthly rhythm, not a one-time push" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/digital-marketing-secondary.jpg"
        imageAlt="Planning social media content on a phone"
        eyebrow={service.tagline}
        heading="Grow your audience"
        headingAccent="between books, not just around one."
        subtext="Ongoing social, email, and ad management managed month over month, with clear reporting on what's working."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Start growing your author brand"
        panelText="Tell us where you're posting now — we'll take it from there."
      />
    </div>
  );
}
