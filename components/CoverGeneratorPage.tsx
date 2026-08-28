"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Camera,
  Check,
  Clock,
  Droplet,
  Eye,
  Feather,
  Film,
  Heart,
  HelpCircle,
  ImagePlus,
  Layers,
  Lightbulb,
  Lock,
  MessageCircle,
  Moon,
  Palette,
  Plus,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Smile,
  Sparkles,
  Timer,
  Type,
  Wand2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BOOK_COVERS, COVER_FAQS as CONTENT_COVER_FAQS } from "@/lib/content";
import { fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { errorMessage, type RTKQueryError } from "@/lib/rtkQueryError";
import { useGenerateBookCoversMutation } from "@/lib/store/api";
import { cn } from "@/lib/utils";
import { AuthModal } from "./AuthModal";
import { useAuth } from "./AuthProvider";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";
import { StudioCta } from "./StudioCta";
import { TrustBar } from "./TrustBar";

const GENRES = [
  { label: "Fiction", icon: BookOpen },
  { label: "Memoir", icon: Feather },
  { label: "Fantasy", icon: Wand2 },
  { label: "Thriller", icon: Eye },
  { label: "Romance", icon: Heart },
  { label: "Business", icon: Briefcase },
  { label: "Self-Help", icon: Lightbulb },
  { label: "Children's", icon: Smile },
  { label: "Sci-Fi", icon: Rocket },
];

const STYLES = [
  { label: "Cinematic illustration", icon: Film },
  { label: "Minimalist typography", icon: Type },
  { label: "Photographic", icon: Camera },
  { label: "Fantasy art", icon: Sparkles },
  { label: "Vintage", icon: Clock },
  { label: "Watercolor", icon: Droplet },
  { label: "Dark & moody", icon: Moon },
  { label: "Bold & colorful", icon: Palette },
];

const FORM_STEPS = [
  { key: "details", label: "Details" },
  { key: "genre", label: "Genre" },
  { key: "style", label: "Style" },
  { key: "mood", label: "Mood" },
] as const;

// Bright, colorful covers only — picked by slug so the hero showcase never
// pulls one of the darker/moodier covers from BOOK_COVERS.
const BRIGHT_COVER_SLUGS = ["the-desire-from", "the-lamb", "pregnant-15"];

const LOADING_MESSAGES = [
  "Sketching cover concepts...",
  "Choosing a color palette...",
  "Composing the artwork...",
  "Setting the typography...",
  "Almost ready...",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Feather,
    title: "Tell us about your book",
    text: "Title, genre, style, and a sentence or two about the story or mood.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "AI designs 3 concepts",
    text: "Our generator produces three distinct cover directions in under a minute.",
  },
  {
    step: "03",
    icon: Palette,
    title: "Refine with our designers",
    text: "Pick a favorite and our in-house team polishes it into a launch-ready cover.",
  },
];

const GENERATOR_PERKS = [
  { icon: Timer, text: "Ready in under a minute" },
  { icon: Layers, text: "3 distinct concepts, every time" },
  { icon: ShieldCheck, text: "Free, no account required" },
];

const COVER_FAQS = CONTENT_COVER_FAQS;

export function CoverGeneratorPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <GeneratorSection />
      <GallerySection />
      <HowItWorksSection />
      <FaqSection />
      <TrustBar />
      <StudioCta
        image="/images/sections/cover-generator-hero.jpg"
        imageAlt="Colorful book covers laid out, showcasing striking cover design"
        eyebrow="Beyond the AI concept"
        heading="Love a direction?"
        headingAccent="Let our designers make it real."
        subtext="AI concepts are a starting point. Our in-house design team refines typography, color, and detail into a launch-ready cover."
        bullets={[
          "Human-refined final artwork",
          "Print & platform-ready files",
          "Unlimited revision rounds",
          "Matched to your genre",
        ]}
        panelTitle="Turn your concept into a cover"
        panelText="Share your favorite generated concept to get started."
      />
    </div>
  );
}

function HeroSection() {
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-[#f3f6f9]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 88% 12%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-sky/20 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-navy/10 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting sparkle particles for a touch of "AI magic" */}
      {[
        { top: "14%", left: "6%", delay: 0, size: 16 },
        { top: "70%", left: "10%", delay: 1.2, size: 12 },
        { top: "22%", left: "46%", delay: 0.6, size: 10 },
        { top: "82%", left: "52%", delay: 1.8, size: 14 },
        { top: "10%", left: "92%", delay: 0.9, size: 12 },
      ].map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute text-sky/50"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0, 1, 0], y: [0, -14, 0], scale: [0.7, 1, 0.7] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles width={s.size} height={s.size} strokeWidth={1.75} />
        </motion.span>
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 bg-sky-soft/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky"
          >
            <Wand2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            The Readsy Publishers exclusive · Free tool
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            AI Book Cover <span className="text-sky">Generator</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Enter your book&apos;s details and get 3 original cover concepts
            in under a minute — a fast way to see your book on a shelf before
            you commit to a full design.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#generator">
              <Button variant="primary" size="lg">
                Generate my cover
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <Button variant="navy" size="lg" onClick={openChat}>
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Ask a designer
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-muted-border pt-6 text-sm text-text-muted"
          >
            <span>3 concepts per generation</span>
            <span>No design experience needed</span>
            <span>Free to try</span>
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
            className="absolute -inset-4 rounded-[2rem] bg-sky/20 blur-3xl"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <Image
                src="/images/sections/cover-generator-hero.jpg"
                alt="Colorful book covers laid out, showcasing striking cover design"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-navy/5" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md"
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="h-3.5 w-3.5 text-sky-bright" strokeWidth={2} fill="currentColor" />
              </motion.span>
              Generated in seconds
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md"
            >
              <div className="flex -space-x-3">
                {BRIGHT_COVER_SLUGS.map(
                  (slug) => BOOK_COVERS.find((c) => c.slug === slug)!,
                ).map((cover, i) => (
                  <motion.span
                    key={cover.slug}
                    className="relative h-12 w-9 overflow-hidden rounded-md shadow-md ring-2 ring-navy-deep/40"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={cover.front}
                      alt={cover.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="36px"
                    />
                  </motion.span>
                ))}
              </div>
              <p className="mt-2 text-[11px] font-medium text-white/80">
                3 concepts, instantly
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                <p className="font-display text-lg font-semibold text-white">
                  Your book, cover-ready
                </p>
                <p className="mt-1 text-sm text-white/70">
                  From a blank title to shelf-worthy artwork — powered by AI,
                  polished by our designers.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GeneratorSection() {
  const { openQuote } = useQuote();
  const { user } = useAuth();
  const [generateCovers] = useGenerateBookCoversMutation();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(GENRES[0].label);
  const [style, setStyle] = useState(STYLES[0].label);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [images, setImages] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  function goToStep(next: number) {
    if (next < 0 || next >= FORM_STEPS.length) return;
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, LOADING_MESSAGES.length - 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [loading]);

  async function runGeneration() {
    setLoading(true);
    setError(null);
    setImages(null);
    try {
      const result = await generateCovers({
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        author: author.trim() || undefined,
        genre,
        style,
        description: description.trim() || undefined,
      }).unwrap();
      setImages(result.images);
    } catch (err) {
      setError(errorMessage(err as RTKQueryError, "Cover generation failed"));
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || loading) return;

    // Don't gate the whole page behind a login wall — let visitors fill out
    // the whole form freely, and only ask them to sign in right at the
    // point of value (generating), the way most modern SaaS sign-up flows
    // do. Their inputs are preserved, so the modal never feels like a dead end.
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    await runGeneration();
  }

  function handleAuthenticated() {
    setAuthModalOpen(false);
    void runGeneration();
  }

  return (
    <MotionSection
      id="generator"
      className="scroll-mt-24 relative overflow-hidden bg-gradient-to-b from-surface via-sky-soft/40 to-surface"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-sky/15 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-navy/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Try it now
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Design your book cover
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Fill in your book&apos;s details below and we&apos;ll generate
            three original cover concepts.
          </p>
        </MotionItem>

        <MotionItem className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {GENERATOR_PERKS.map((perk) => (
            <div
              key={perk.text}
              className="flex items-center gap-2 text-sm font-medium text-navy/80"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-soft text-sky">
                <perk.icon className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              {perk.text}
            </div>
          ))}
        </MotionItem>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <MotionItem className="h-full">
            <form
              onSubmit={onSubmit}
              className="flex h-full flex-col rounded-3xl border border-muted-border bg-white p-6 shadow-[0_30px_80px_-48px_rgba(11,31,58,0.35)] sm:p-8"
            >
              {/* Step progress */}
              <div className="flex items-center">
                {FORM_STEPS.map((s, i) => {
                  const isActive = i === step;
                  const isDone = i < step;
                  return (
                    <div key={s.key} className="flex flex-1 items-center last:flex-initial">
                      <button
                        type="button"
                        onClick={() => isDone && goToStep(i)}
                        disabled={!isDone}
                        className="flex flex-col items-center gap-1.5 disabled:cursor-default"
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition",
                            isActive
                              ? "bg-sky text-white ring-4 ring-sky/20"
                              : isDone
                                ? "bg-sky text-white"
                                : "bg-muted text-text-muted",
                          )}
                        >
                          {isDone ? <Check className="h-4 w-4" strokeWidth={2.5} /> : i + 1}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-medium",
                            isActive ? "text-navy" : "text-text-muted",
                          )}
                        >
                          {s.label}
                        </span>
                      </button>
                      {i < FORM_STEPS.length - 1 ? (
                        <div className="mx-1.5 h-0.5 flex-1 -translate-y-2.5 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className="h-full bg-sky"
                            initial={false}
                            animate={{ width: isDone ? "100%" : "0%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="relative mt-7 min-h-[320px] flex-1 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  {step === 0 ? (
                    <motion.div
                      key="details"
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -32 : 32 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-sm font-semibold text-navy">
                        Let&apos;s start with the basics
                      </p>
                      <div className="mt-4 flex flex-col gap-1.5">
                        <label
                          htmlFor="cover-title"
                          className="text-sm font-semibold text-navy"
                        >
                          Book title
                        </label>
                        <input
                          id="cover-title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          maxLength={120}
                          placeholder="The Long Road Home"
                          className="h-11 w-full rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy outline-none transition placeholder:text-text-muted/60 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
                        />
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="cover-subtitle"
                            className="text-sm font-semibold text-navy"
                          >
                            Subtitle{" "}
                            <span className="font-normal text-text-muted">
                              (optional)
                            </span>
                          </label>
                          <input
                            id="cover-subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            maxLength={140}
                            placeholder="A memoir of second chances"
                            className="h-11 w-full rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy outline-none transition placeholder:text-text-muted/60 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="cover-author"
                            className="text-sm font-semibold text-navy"
                          >
                            Author name{" "}
                            <span className="font-normal text-text-muted">
                              (optional)
                            </span>
                          </label>
                          <input
                            id="cover-author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            maxLength={80}
                            placeholder="Your name"
                            className="h-11 w-full rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy outline-none transition placeholder:text-text-muted/60 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : null}

                  {step === 1 ? (
                    <motion.div
                      key="genre"
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -32 : 32 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-sm font-semibold text-navy">
                        What genre is your book?
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-2.5">
                        {GENRES.map((g) => {
                          const selected = genre === g.label;
                          return (
                            <motion.button
                              key={g.label}
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setGenre(g.label)}
                              className={cn(
                                "group relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition",
                                selected
                                  ? "border-sky bg-sky-soft/70 shadow-sm"
                                  : "border-muted-border bg-[#fafcfe] hover:border-sky/40",
                              )}
                            >
                              <span
                                className={cn(
                                  "absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full border transition",
                                  selected
                                    ? "border-sky bg-sky text-white"
                                    : "border-muted-border bg-white",
                                )}
                              >
                                {selected ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                              </span>
                              <span
                                className={cn(
                                  "flex h-9 w-9 items-center justify-center rounded-full transition",
                                  selected
                                    ? "bg-sky text-white"
                                    : "bg-muted text-text-muted group-hover:text-navy",
                                )}
                              >
                                <g.icon className="h-4 w-4" strokeWidth={2} />
                              </span>
                              <span
                                className={cn(
                                  "text-[11px] font-semibold leading-tight",
                                  selected ? "text-navy" : "text-text-muted group-hover:text-navy",
                                )}
                              >
                                {g.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}

                  {step === 2 ? (
                    <motion.div
                      key="style"
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -32 : 32 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-sm font-semibold text-navy">
                        Pick a cover style
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-2.5">
                        {STYLES.map((s) => {
                          const selected = style === s.label;
                          return (
                            <motion.button
                              key={s.label}
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setStyle(s.label)}
                              className={cn(
                                "group relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition",
                                selected
                                  ? "border-sky bg-sky-soft/70 shadow-sm"
                                  : "border-muted-border bg-[#fafcfe] hover:border-sky/40",
                              )}
                            >
                              <span
                                className={cn(
                                  "absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full border transition",
                                  selected
                                    ? "border-sky bg-sky text-white"
                                    : "border-muted-border bg-white",
                                )}
                              >
                                {selected ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                              </span>
                              <span
                                className={cn(
                                  "flex h-9 w-9 items-center justify-center rounded-full transition",
                                  selected
                                    ? "bg-sky text-white"
                                    : "bg-muted text-text-muted group-hover:text-navy",
                                )}
                              >
                                <s.icon className="h-4 w-4" strokeWidth={2} />
                              </span>
                              <span
                                className={cn(
                                  "text-[11px] font-semibold leading-tight",
                                  selected ? "text-navy" : "text-text-muted group-hover:text-navy",
                                )}
                              >
                                {s.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}

                  {step === 3 ? (
                    <motion.div
                      key="mood"
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -32 : 32 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-full flex-col"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="cover-description"
                          className="text-sm font-semibold text-navy"
                        >
                          Describe the scene or mood{" "}
                          <span className="font-normal text-text-muted">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          id="cover-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={6}
                          maxLength={500}
                          placeholder="Example: A lone figure walking down a dusty highway at sunset, silhouetted against a wide-open sky..."
                          className="w-full resize-none rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 py-3 text-sm leading-relaxed text-navy outline-none transition placeholder:text-text-muted/60 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
                        />
                        <div className="flex justify-end text-[11px] text-text-muted">
                          <span>{description.length}/500</span>
                        </div>
                      </div>

                      {error ? (
                        <p className="mt-3 text-sm text-red-600" role="alert">
                          {error}
                        </p>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => goToStep(step - 1)}
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                    Back
                  </Button>
                ) : null}

                {step < FORM_STEPS.length - 1 ? (
                  <Button
                    type="button"
                    variant="primary"
                    className="flex-1"
                    disabled={step === 0 && !title.trim()}
                    onClick={() => goToStep(step + 1)}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!title.trim()}
                    loading={loading}
                    loadingText="Designing your covers..."
                  >
                    <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                    Generate Book Covers
                  </Button>
                )}
              </div>
              {step === FORM_STEPS.length - 1 ? (
                <p className="mt-2.5 text-center text-[11px] text-text-muted">
                  {user ? (
                    "Takes about 30-60 seconds. AI-generated concepts — final covers are refined by our design team."
                  ) : (
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <Lock className="h-3 w-3" strokeWidth={2} />
                      Free account required — we&apos;ll ask you to sign in when you generate.
                    </span>
                  )}
                </p>
              ) : null}
            </form>
          </MotionItem>

          <MotionItem className="h-full">
            <ResultsPanel
              loading={loading}
              loadingStep={loadingStep}
              images={images}
              error={error}
              onOpenQuote={openQuote}
            />
          </MotionItem>
        </div>

        <AuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onAuthenticated={handleAuthenticated}
          title="Sign in to generate your covers"
          subtitle="Create a free account to reveal your three AI-generated concepts."
        />
      </div>
    </MotionSection>
  );
}

function ResultsPanel({
  loading,
  loadingStep,
  images,
  error,
  onOpenQuote,
}: {
  loading: boolean;
  loadingStep: number;
  images: string[] | null;
  error: string | null;
  onOpenQuote: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-3xl border border-navy/10 bg-gradient-to-br from-navy-deep via-navy to-[#0d4f73] p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-sky/25 blur-3xl" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sky-bright/10 blur-3xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-bright">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          Your cover concepts
        </p>
        {images ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70"
          >
            {images.length} concepts
          </motion.span>
        ) : null}
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {!images && !error && !loading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col justify-center"
            >
              <p className="font-display text-2xl font-semibold leading-snug">
                Three original cover concepts will appear here.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Fill in the form and generate a first look at your book on the
                shelf, then let The Readsy Publishers&apos; designers turn a
                favorite into a launch-ready cover.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="flex aspect-[2/3] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5"
                    animate={{ opacity: [0.5, 0.85, 0.5] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <ImagePlus
                      className="h-6 w-6 text-white/30"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}

          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col justify-center gap-6"
            >
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/10"
                    animate={{ opacity: [0.35, 0.75, 0.35] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      animate={{ translateX: ["-100%", "150%"] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <motion.span
                  className="h-2 w-2 rounded-full bg-sky-bright"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-white/75"
                  >
                    {LOADING_MESSAGES[loadingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}

          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-1 flex-col justify-center"
            >
              <p className="rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </p>
            </motion.div>
          ) : null}

          {images && !loading ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-1 flex-col justify-between gap-6"
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 16, rotate: i === 0 ? -4 : i === 2 ? 4 : 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative aspect-[2/3] select-none overflow-hidden rounded-xl shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/15"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <Image
                      src={src}
                      alt={`Generated book cover concept ${i + 1}`}
                      fill
                      unoptimized
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      className="pointer-events-none object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    {/* Preview watermark — final files are delivered by our design team, not downloaded here */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div
                        className="flex -rotate-[30deg] flex-col gap-6 opacity-25"
                        aria-hidden
                      >
                        {[0, 1, 2].map((row) => (
                          <div key={row} className="flex gap-6 whitespace-nowrap">
                            {[0, 1].map((col) => (
                              <span
                                key={col}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                              >
                                Readsy Preview
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <p className="text-[11px] text-white/50">
                  Preview only — concepts aren&apos;t available to download.
                  Our design team delivers your final, watermark-free cover
                  file directly once you start a project.
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <Button className="w-full" onClick={onOpenQuote}>
                    Turn This Into My Book Cover
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                    onClick={() =>
                      document
                        .getElementById("cover-title")
                        ?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                  >
                    <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
                    Try Different Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <MotionSection className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 grain opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-bright">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From idea to cover in three steps
          </h2>
        </MotionItem>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-11 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
          {HOW_IT_WORKS.map((item) => (
            <MotionItem key={item.step}>
              <article className="group relative h-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-sky/30 hover:bg-white/15">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky/20 text-sky-bright transition group-hover:bg-sky group-hover:text-white">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-3xl font-bold text-white/20">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </article>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function GallerySection() {
  const covers = BOOK_COVERS.slice(0, 6);

  return (
    <MotionSection className="relative overflow-hidden bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Real results
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            See what&apos;s possible
          </h2>
          <p className="mt-3 text-base text-text-muted">
            A glimpse of covers our studio has taken from concept to
            print-ready, across memoir, fiction, and children&apos;s books.
          </p>
        </MotionItem>

        <motion.div
          className="mx-auto mt-12 grid max-w-5xl grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {covers.map((cover) => (
            <motion.div
              key={cover.slug}
              variants={fadeUp}
              whileHover={{ y: -8, rotate: 0 }}
              className="group relative aspect-[2/3] overflow-hidden rounded-lg shadow-[0_20px_40px_-24px_rgba(11,31,58,0.4)] ring-1 ring-navy/10 transition-shadow duration-300 hover:shadow-[0_28px_50px_-20px_rgba(11,31,58,0.5)]"
            >
              <Image
                src={cover.front}
                alt={cover.title}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
            </motion.div>
          ))}
        </motion.div>

        <MotionItem className="mt-10 text-center">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky transition hover:text-sky-bright"
          >
            View the full portfolio
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <MotionSection className="relative overflow-hidden bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="text-center">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            <HelpCircle className="h-3.5 w-3.5" strokeWidth={2} />
            Questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Cover generator FAQ
          </h2>
        </MotionItem>

        <MotionItem className="mt-10 space-y-3">
          {COVER_FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition",
                  open ? "border-sky/30 bg-sky-soft/40" : "border-muted-border hover:border-sky/25",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy"
                  aria-expanded={open}
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition",
                      open ? "bg-sky text-white" : "bg-navy/5 text-navy",
                    )}
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </MotionItem>
      </div>
    </MotionSection>
  );
}
