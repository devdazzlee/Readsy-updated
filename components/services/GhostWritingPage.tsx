"use client";

import Image from "next/image";
import Link from "../Link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  Feather,
  Heart,
  Lightbulb,
  Map as MapIcon,
  MessageCircle,
  Mic,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRelatedServices, getServiceDetail } from "@/lib/serviceDetails";
import { fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { useChat } from "../ChatProvider";
import { useQuote } from "../QuoteProvider";
import { StudioCta } from "../StudioCta";
import { FaqAccordionItem, RelatedServices } from "./shared";

const service = getServiceDetail("ghost-writing")!;
const related = getRelatedServices("ghost-writing");

const TRANSFORM = {
  before:
    "so basically i had this idea for years about my dad and how he came here with nothing and like built everything from scratch, i never wrote it down just told people at dinner",
  after:
    "My father arrived with two suitcases and a language he barely spoke. Everything you see today — the business, the house, the life we built — started there, at the bottom of a staircase he didn't know led anywhere.",
};

const BENEFIT_ICONS = [Feather, MapIcon, RefreshCw, ShieldCheck];

const GHOSTWRITING_TYPES = [
  {
    icon: Heart,
    title: "Memoir Ghostwriting",
    text: "Your life story, shaped into a compelling, publishable memoir written in your authentic voice.",
  },
  {
    icon: Briefcase,
    title: "Business & Thought Leadership",
    text: "Books that establish your expertise, built from interviews, existing content, and your professional insight.",
  },
  {
    icon: Sparkles,
    title: "Fiction Ghostwriting",
    text: "A full-length novel developed from your concept, characters, and outline, written in a genre-matched voice.",
  },
  {
    icon: Lightbulb,
    title: "Self-Help & How-To Books",
    text: "A practical, structured guide that turns your expertise into a book readers can actually act on.",
  },
  {
    icon: UserRound,
    title: "Autobiography Collaboration",
    text: "A deeply personal, chronological account of your life, developed through in-depth recorded interviews.",
  },
  {
    icon: Mic,
    title: "Speech-to-Book Development",
    text: "We turn your recorded talks, voice memos, or interviews into a fully structured, cohesive manuscript.",
  },
];

export function GhostWritingPage() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <div className="flex flex-col">
      {/* Hero — editorial, asymmetric */}
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 15%, rgba(29,169,224,0.16), transparent 38%), radial-gradient(circle at 92% 80%, rgba(11,31,58,0.07), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-6 top-2 select-none font-display text-[13rem] font-bold leading-none text-navy/[0.04] sm:text-[18rem]"
        >
          &ldquo;
        </span>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-28">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="transition hover:text-navy">Home</Link>
              <span>/</span>
              <Link href="/pricing" className="transition hover:text-navy">Services</Link>
              <span>/</span>
              <span className="text-navy">Ghost Writing</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-sky"
            >
              {service.tagline}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 max-w-lg font-display text-6xl font-bold leading-[0.98] tracking-tight text-navy sm:text-7xl"
            >
              Ghost
              <br />
              <span className="italic text-sky">Writing.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-md text-base leading-relaxed text-text-muted sm:text-lg"
            >
              {service.heroSubtext}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" onClick={openQuote}>
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="navy" size="lg" onClick={openChat}>
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Ask a Specialist
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-muted-border pt-6 text-sm text-text-muted"
            >
              <span className="font-display text-xl font-bold text-navy">{service.price}</span>
              <span>{service.unit}</span>
              <span className="hidden h-4 w-px bg-muted-border sm:block" />
              <span>{service.stat.value} {service.stat.label}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative rounded-sm border-[10px] border-white bg-white shadow-[0_45px_90px_-30px_rgba(11,31,58,0.55)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/services/ghost-writing-hero.jpg"
                  alt="A writer capturing an author's story"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-6 -top-6 rounded-lg border border-muted-border bg-white px-4 py-3 text-xs font-semibold text-navy shadow-[0_18px_40px_-20px_rgba(11,31,58,0.4)] sm:-right-10"
            >
              &ldquo;Sounds exactly<br />like me.&rdquo;
              <span className="mt-1 block text-[10px] font-normal text-text-muted">— every client, eventually</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-navy/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-bright opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-bright" />
              </span>
              Currently accepting new authors
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What we offer — ghostwriting sub-services */}
      <MotionSection className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              What we offer
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Ghost Writing services with The Readsy Publishers
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Every story needs a different approach. Here's the range of
              ghostwriting our team covers, so you can see exactly where
              your project fits.
            </p>
          </MotionItem>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GHOSTWRITING_TYPES.map((item) => (
              <MotionItem key={item.title}>
                <article className="group flex h-full flex-col rounded-2xl border border-muted-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky/35 hover:shadow-[0_24px_50px_-32px_rgba(11,31,58,0.4)]">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-sky-bright text-white shadow-md shadow-sky/25 transition duration-300 group-hover:scale-105">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </article>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Voice-match transformation — manuscript page mock */}
      <MotionSection className="relative overflow-hidden bg-[#efece3] py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 grain opacity-25" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <MotionItem className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              How it reads
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Your rambling voice memo. Our finished chapter.
            </h2>
          </MotionItem>

          <MotionItem
            variants={fadeUp}
            className="relative mt-14 -rotate-1 rounded-sm bg-[#fbf9f2] px-8 py-10 shadow-[0_40px_90px_-30px_rgba(11,31,58,0.4)] sm:px-14 sm:py-14"
          >
            <p className="text-center font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/40">
              Chapter One — Draft
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-navy/15" />

            <p className="relative mt-8 font-display text-base italic leading-loose text-navy/45 sm:text-lg">
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -left-1 -top-2 h-3 w-full text-red-400/70"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 8 Q 10 2 20 8 T 40 8 T 60 8 T 80 8 T 100 8 T 120 8 T 140 8 T 160 8 T 180 8 T 200 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              &ldquo;{TRANSFORM.before}&rdquo;
            </p>

            <div className="mx-auto my-8 flex items-center gap-3 text-navy/30">
              <span className="h-px flex-1 bg-navy/10" />
              <ArrowRight className="h-4 w-4 rotate-90" />
              <span className="h-px flex-1 bg-navy/10" />
            </div>

            <p className="font-display text-xl leading-relaxed text-navy sm:text-2xl">
              &ldquo;{TRANSFORM.after}&rdquo;
            </p>
            <p className="mt-6 text-right text-xs font-semibold uppercase tracking-[0.16em] text-sky">
              — polished by your ghostwriter
            </p>
          </MotionItem>
        </div>
      </MotionSection>

      {/* Benefits — connected vertical timeline */}
      <MotionSection className="relative overflow-hidden bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              What's included
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A process built for trust
            </h2>
          </MotionItem>

          <div className="relative mt-14">
            <div className="absolute bottom-4 left-6 top-4 w-px bg-muted-border sm:left-7" />
            <div className="space-y-8">
              {service.benefits.map((item, i) => {
                const Icon = BENEFIT_ICONS[i] ?? Feather;
                return (
                  <MotionItem key={item.title} className="relative flex gap-5 pl-0 sm:gap-6">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-white shadow-md shadow-navy/25 sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-display text-lg font-semibold text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-muted sm:text-base">
                        {item.text}
                      </p>
                    </div>
                  </MotionItem>
                );
              })}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Process — horizontal stepper */}
      <MotionSection className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
          <MotionItem className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">
              The process
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              From first call to final manuscript
            </h2>
          </MotionItem>

          <div className="relative mt-20 hidden sm:block">
            <div className="absolute left-0 right-0 top-8 h-px bg-muted-border" />
            <div className="grid grid-cols-4 gap-8">
              {service.process.map((item) => (
                <MotionItem key={item.step} className="relative text-center">
                  <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface bg-sky font-display text-lg font-bold text-white shadow-md shadow-sky/25">
                    {item.step}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </MotionItem>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-7 sm:hidden">
            {service.process.map((item) => (
              <MotionItem key={item.step} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky font-display text-base font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-text-muted">{item.text}</p>
                </div>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Stat + deliverables banner */}
      <MotionSection className="relative overflow-hidden bg-navy-deep text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(43,184,240,0.22), transparent 40%), radial-gradient(circle at 90% 0%, rgba(43,184,240,0.12), transparent 45%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-20" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
          <MotionItem className="relative">
            <div className="absolute -inset-10 rounded-full bg-sky-bright/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-bright">
                By the numbers
              </span>
              <p className="mt-5 font-display text-7xl font-bold leading-none text-white sm:text-8xl">
                {service.stat.value}
              </p>
              <p className="mt-3 max-w-[14rem] text-base text-white/60">{service.stat.label}</p>
            </div>
          </MotionItem>

          <MotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-bright">
              You'll receive
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              Everything included, nothing hidden
            </h3>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-sm text-white/85 backdrop-blur-sm transition duration-300 hover:border-sky-bright/40 hover:bg-white/[0.08]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-bright/15 text-sky-bright transition group-hover:bg-sky-bright group-hover:text-navy">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="primary" className="mt-8" onClick={openQuote}>
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </MotionItem>
        </div>
      </MotionSection>

      {/* FAQ */}
      <MotionSection className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <MotionItem className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Frequently asked questions
            </h2>
          </MotionItem>
          <MotionItem className="mt-10 space-y-3">
            {service.faqs.map((item) => (
              <FaqAccordionItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </MotionItem>
          <MotionItem className="mt-10 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky transition hover:text-sky-bright"
            >
              Compare all services & pricing
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </MotionItem>
        </div>
      </MotionSection>

      <RelatedServices items={related} />

      <StudioCta
        image="/images/services/ghost-writing-secondary.jpg"
        imageAlt="A ghostwriter at work on a client's manuscript"
        eyebrow={service.tagline}
        heading="Your story deserves"
        headingAccent="a writer who gets it right."
        subtext="One dedicated ghostwriter, a confidential process, and unlimited revisions until every chapter sounds like you."
        bullets={service.deliverables.slice(0, 4)}
        panelTitle="Start your ghostwriting project"
        panelText="Tell us your story idea — a specialist replies within a day."
      />
    </div>
  );
}
