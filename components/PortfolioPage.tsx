"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_BOOK_COVERS, BOOK_CATEGORIES, BOOK_COVERS } from "@/lib/content";
import { fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BookCoverFlip } from "./BookCoverFlip";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";
import { StatsBar } from "./StatsBar";
import { StudioCta } from "./StudioCta";
import { Testimonials } from "./Testimonials";
import { TrustBar } from "./TrustBar";

const FILTERS = ["All", ...BOOK_CATEGORIES] as const;

const CATEGORY_STYLES: Record<(typeof BOOK_CATEGORIES)[number], string> = {
  "Memoir & Nonfiction": "bg-sky/90 text-white",
  "Children's Books": "bg-emerald-500/90 text-white",
  Fiction: "bg-violet-500/90 text-white",
};

function SpotlightCard({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState({ x: 50, y: 30 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group/spot relative rounded-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(140px circle at ${pos.x}% ${pos.y}%, rgba(29,169,224,0.5), transparent 75%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

type CollagePosition = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  rotate: number;
  z: number;
  float: number;
};

const COLLAGE_STYLES: CollagePosition[] = [
  { top: "8%", left: "4%", width: "56%", rotate: -7, z: 10, float: 5.5 },
  { bottom: "4%", left: "20%", width: "58%", rotate: 5, z: 20, float: 6.5 },
  { top: "2%", right: "2%", width: "50%", rotate: 8, z: 30, float: 6 },
];

const DRIFT_DOTS = [
  { top: "20%", left: "10%", size: 8, drift: 14 },
  { top: "60%", left: "85%", size: 6, drift: -18 },
  { top: "80%", left: "15%", size: 5, drift: 10 },
];

export function PortfolioPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBar />
      <GallerySection />
      <TrustBar />
      <Testimonials />
      <StudioCta
        image="/images/sections/portfolio-cta.jpg"
        imageAlt="A stack of published books ready for readers"
        eyebrow="Your book could be next"
        heading="Every book here started"
        headingAccent="the same way yours can."
        subtext="A short consultation, a dedicated team, and a clear plan — that's how every cover in this portfolio got made. Yours starts with one conversation."
        bullets={[
          "Real books, real launches",
          "Every genre covered",
          "Full creative support",
          "You approve every step",
        ]}
        panelTitle="See your book here next"
        panelText="Tell us about your project and get a clear path to publication."
      />
    </div>
  );
}

function HeroSection() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();
  const previewBooks = BOOK_COVERS.slice(0, 3);

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

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-sky"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.35rem]"
          >
            Real books, <span className="text-sky">real authors</span>, real
            launches
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            From first draft to bestseller shelf, explore the manuscripts,
            covers, and campaigns our studio has brought to life for authors
            across memoir, fiction, and children&apos;s books.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={openQuote}>
              Free Author Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="navy" size="lg" onClick={openChat}>
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Live Chat
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-muted-border pt-6 text-sm text-text-muted"
          >
            <span>2,400+ books delivered</span>
            <span>50+ genres covered</span>
            <span>98% client satisfaction</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-sm flex-col items-center"
        >
          <div className="relative h-[24rem] w-full sm:h-[30rem]">
            <motion.div
              className="absolute -inset-6 rounded-[2rem] bg-sky/15 blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: [0, 0.9, 0.6, 0.9], scale: [0.8, 1.1, 1, 1.05] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.6, delay: 0.1, ease: "easeInOut" }}
            />

            {DRIFT_DOTS.map((dot, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute rounded-full bg-sky-bright/70 blur-[1px]"
                style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 1, 0], y: [0, -30, -55], x: [0, dot.drift, dot.drift * 1.6] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8 + i * 0.6,
                }}
              />
            ))}

            {previewBooks.map((book, i) => {
              const pos = COLLAGE_STYLES[i];
              return (
                <motion.div
                  key={book.slug}
                  className="absolute aspect-[2/3] cursor-pointer"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    bottom: pos.bottom,
                    width: pos.width,
                    zIndex: pos.z,
                  }}
                  initial={{ opacity: 0, scale: 0.7, y: 70, rotate: pos.rotate * 2.4 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate: pos.rotate }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: 1.07,
                    rotate: 0,
                    zIndex: 50,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 15,
                    delay: 0.15 + i * 0.18,
                  }}
                >
                  <motion.div
                    className="h-full w-full overflow-hidden rounded-xl shadow-[0_30px_70px_-28px_rgba(11,31,58,0.55)] ring-1 ring-black/10"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{
                      duration: pos.float,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.1 + i * 0.4,
                    }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={book.front}
                        alt={`${book.title} cover`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 60vw, 22vw"
                      />
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                        initial={{ x: "-140%" }}
                        whileInView={{ x: "160%" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.18, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 14,
              delay: 0.85,
            }}
            className="relative z-40 mt-5 flex items-center gap-2 rounded-full border border-white bg-white/95 px-4 py-2.5 text-xs font-semibold text-navy shadow-[0_18px_40px_-24px_rgba(11,31,58,0.5)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            2,400+ titles published
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function categoryLabel(category: (typeof BOOK_CATEGORIES)[number]) {
  if (category === "Memoir & Nonfiction") return "Memoir";
  if (category === "Children's Books") return "Kids";
  return "Fiction";
}

function GallerySection() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const filtered =
    active === "All"
      ? ALL_BOOK_COVERS
      : ALL_BOOK_COVERS.filter((book) => book.category === active);

  return (
    <MotionSection
      id="gallery"
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
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.15]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 bg-sky-soft/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            Published work
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Books we helped bring to life
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Every cover our studio has designed and delivered. Hover a cover
            to see more, and filter by genre to explore titles from authors
            who trusted The Readsy Publishers with their story.
          </p>
          <p className="mt-4 font-display text-sm font-semibold text-sky">
            {ALL_BOOK_COVERS.length} covers · {BOOK_CATEGORIES.length} genres · one studio
          </p>
        </MotionItem>

        <MotionItem className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => {
            const count =
              filter === "All"
                ? ALL_BOOK_COVERS.length
                : ALL_BOOK_COVERS.filter((b) => b.category === filter).length;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-semibold transition",
                  active === filter
                    ? "border-transparent text-white"
                    : "border-muted-border bg-white text-text-muted hover:border-sky/40 hover:text-navy",
                )}
              >
                {active === filter ? (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    className="absolute inset-0 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">
                  {filter}
                  <span
                    className={cn(
                      "ml-1.5 text-xs",
                      active === filter ? "text-white/60" : "text-text-muted/60",
                    )}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </MotionItem>

        <motion.div
          layout
          className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((book, i) => (
              <motion.div
                key={book.slug}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 8) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SpotlightCard>
                  <BookCoverFlip
                    variant="poster"
                    title={book.title}
                    author={book.author}
                    front={book.front}
                    back={book.back}
                    badge={
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] shadow-sm backdrop-blur",
                          CATEGORY_STYLES[book.category],
                        )}
                      >
                        {categoryLabel(book.category)}
                      </span>
                    }
                  />
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionSection>
  );
}
