"use client";

import { motion } from "framer-motion";
import Link from "./Link";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/motion";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  crossLink,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
  crossLink?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-[#f3f6f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 85% 15%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-sky"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-text-muted">
            Last updated: {updated}
          </motion.p>
          {intro ? (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted"
            >
              {intro}
            </motion.p>
          ) : null}
          {crossLink ? (
            <motion.div variants={fadeUp} className="mt-6">
              <Link
                href={crossLink.href}
                className="text-sm font-semibold text-sky transition hover:text-sky-bright"
              >
                {crossLink.label} →
              </Link>
            </motion.div>
          ) : null}
        </motion.div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                On this page
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-text-muted transition hover:bg-sky-soft hover:text-navy"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-12">
            {sections.map((s) => (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-28 border-b border-muted-border pb-12 last:border-0 last:pb-0"
              >
                <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">{s.body}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-text-muted sm:text-base">
      {children}
    </p>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-2.5 text-sm leading-relaxed text-text-muted sm:text-base"
        >
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold text-navy sm:text-lg">
      {children}
    </h3>
  );
}
