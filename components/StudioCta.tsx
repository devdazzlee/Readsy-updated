"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeScale, fadeUp, stagger } from "@/lib/motion";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function StudioCta({
  image = "/images/sections/author-team.jpg",
  imageAlt = "The Readsy Publishers creative team collaborating",
  eyebrow = "The Readsy Publishers studio",
  heading = "One team. One story.",
  headingAccent = "From blank page to published book.",
  subtext = "Writers, editors, designers, and marketers work as one studio so your manuscript never gets lost between freelancers. Stay in control. We handle the craft.",
  bullets = [
    "Dedicated publishing lead",
    "Weekly progress updates",
    "NDA-ready confidentiality",
    "Launch-ready marketing plan",
  ],
  panelTitle = "Free manuscript consultation",
  panelText = "Get a clear path for writing, editing, design, or launch.",
}: {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  subtext?: string;
  bullets?: string[];
  panelTitle?: string;
  panelText?: string;
}) {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-[#f3f6f9]">
      <div className="absolute inset-0">
        <Image
          src="/images/sections/vintage-writing-flatlay.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f6f9]/92 via-[#f3f6f9]/88 to-[#f3f6f9]/95" />
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 8% 15%, rgba(29,169,224,0.18), transparent 38%), radial-gradient(circle at 92% 85%, rgba(11,31,58,0.08), transparent 34%)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 grain opacity-20" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-sky/20 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-navy/10 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-sky"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              {heading}{" "}
              <span className="text-sky">{headingAccent}</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
            >
              {subtext}
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-white bg-white/80 px-3.5 py-3 text-sm font-medium text-navy shadow-[0_18px_40px_-32px_rgba(11,31,58,0.45)] backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" onClick={openQuote}>
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="navy" size="lg" onClick={openChat}>
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Live Chat
              </Button>
            </motion.div>
          </div>

          <motion.div variants={fadeScale} className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-sky/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-bright opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-bright" />
                </span>
                Online now
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                  <p className="font-display text-lg font-semibold text-white">
                    {panelTitle}
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {panelText}
                  </p>
                  <Button
                    variant="primary"
                    className="mt-4 w-full"
                    onClick={openQuote}
                  >
                    Get a Free Quote
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
