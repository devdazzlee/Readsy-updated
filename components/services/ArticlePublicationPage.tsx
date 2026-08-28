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

const service = getServiceDetail("article-publication")!;
const related = getRelatedServices("article-publication");
const BENEFIT_ICONS = [Search, Layout, RefreshCw, Clock3];

const ARTICLE_CARDS = [
  { tag: "Craft", title: "5 Ways to Find Your Author Voice" },
  { tag: "Industry", title: "What Changed in Self-Publishing This Year" },
  { tag: "Behind the Book", title: "How I Structured My First Chapter" },
];

export function ArticlePublicationPage() {
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
            <motion.div variants={fadeUp}><Breadcrumb label="Article Publication" /></motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky">
              {service.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 max-w-lg font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              Article Publication
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
                  src="/images/services/article-publication-hero.jpg"
                  alt="Writer working on a blog article"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/5 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SubServicesGrid
        title="Article Publication services with The Readsy Publishers"
        intro="Consistent, on-brand content that keeps readers coming back between book releases."
        items={service.subServices}
      />

      {/* Signature: article card mockups */}
      <MotionSection className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">On your blog</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Publish-ready, every time
            </h2>
          </MotionItem>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {ARTICLE_CARDS.map((a, i) => (
              <MotionItem key={a.title}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-muted-border bg-white shadow-[0_20px_50px_-40px_rgba(11,31,58,0.35)]">
                  <div className="h-28 bg-gradient-to-br from-sky/25 to-navy/15" />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="w-fit rounded-full bg-sky-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky">
                      {a.tag}
                    </span>
                    <p className="mt-3 font-display text-sm font-semibold leading-snug text-navy">
                      {a.title}
                    </p>
                    <span className="mt-auto pt-4 text-xs font-semibold text-sky">Read more →</span>
                  </div>
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
              Content that builds your brand
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

      <ProcessStepper title="From brief to published post" steps={service.process} />

      <DeliverablesBanner
        statValue={service.stat.value}
        statLabel={service.stat.label}
        deliverables={service.deliverables}
        onQuote={openQuote}
      />

      <FaqBlock faqs={service.faqs} />

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/article-publication-secondary.jpg"
        imageAlt="Stack of published articles and print materials"
        eyebrow={service.tagline}
        heading="Stay visible"
        headingAccent="between book releases."
        subtext="SEO-optimized articles delivered on a consistent schedule, so your author brand keeps showing up in search and social."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Start your content plan"
        panelText="Tell us your topics — first drafts in 3-5 business days."
      />
    </div>
  );
}
