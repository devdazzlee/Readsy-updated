"use client";

import {
  Briefcase,
  Feather,
  HeartHandshake,
  BookOpen,
  Sparkles,
  Smile,
  UserRound,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const GENRES = [
  {
    name: "Memoir",
    blurb: "True life, told with craft",
    icon: Feather,
  },
  {
    name: "Fiction",
    blurb: "Stories that stay with readers",
    icon: BookOpen,
  },
  {
    name: "Business",
    blurb: "Authority for your brand",
    icon: Briefcase,
  },
  {
    name: "Self-Help",
    blurb: "Practical change on the page",
    icon: HeartHandshake,
  },
  {
    name: "Faith",
    blurb: "Books rooted in belief",
    icon: Sparkles,
  },
  {
    name: "Children",
    blurb: "Wonder for young minds",
    icon: Smile,
  },
  {
    name: "Biography",
    blurb: "Lives worth documenting",
    icon: UserRound,
  },
  {
    name: "Thriller",
    blurb: "Pace, suspense, payoff",
    icon: Zap,
  },
] as const;

export function GenreStrip() {
  return (
    <section className="relative overflow-hidden bg-muted py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-navy/8 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            What we publish
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Genres we bring to life
          </h2>
          <p className="mt-3 text-base text-text-muted">
            From intimate memoirs to page-turning thrillers, our team knows how
            each genre should feel on the shelf.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {GENRES.map((genre, index) => {
            const Icon = genre.icon;
            return (
              <motion.div
                key={genre.name}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-muted-border bg-white p-5 shadow-[0_1px_0_rgba(20,29,41,0.04)] transition duration-300 hover:border-sky/35 hover:shadow-[0_28px_50px_-36px_rgba(11,31,58,0.4)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft text-sky transition duration-300 group-hover:bg-gradient-to-br group-hover:from-sky group-hover:to-sky-bright group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky/25">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-xs font-semibold text-sky/35">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                  {genre.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{genre.blurb}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Soft drifting genre ribbon for motion presence */}
        <motion.div
          variants={fadeUp}
          className="relative mt-12 overflow-hidden rounded-full border border-muted-border/80 bg-white/70 py-3 backdrop-blur-sm"
          aria-hidden
        >
          <div className="animate-marquee flex w-max gap-3 whitespace-nowrap px-3">
            {[...GENRES, ...GENRES].map((genre, i) => (
              <span
                key={`${genre.name}-${i}`}
                className="inline-flex items-center rounded-full bg-sky-soft/80 px-4 py-1.5 text-sm font-medium text-navy"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
