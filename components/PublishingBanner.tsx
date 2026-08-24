"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/motion";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function PublishingBanner() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <section
      id="publish"
      className="relative scroll-mt-24 overflow-hidden bg-[#7ed6f0]"
    >
      {/* Soft atmosphere — not a flat stock banner */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-sky/30 blur-3xl" />

      <div className="absolute inset-0">
        <Image
          src="/images/general/banner.jpg"
          alt="Author thinking through her next book idea"
          fill
          className="object-cover object-[78%_center] sm:object-[70%_center] lg:object-right"
          sizes="100vw"
        />
        {/* Left readability wash so type stays crisp on any crop */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#7ed6f0] via-[#7ed6f0]/88 to-transparent sm:w-[68%] lg:w-[58%]" />
      </div>

      <motion.div
        className="relative mx-auto grid min-h-[26rem] max-w-6xl items-center px-4 py-16 sm:min-h-[28rem] sm:px-6 sm:py-20 lg:min-h-[32rem] lg:py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={stagger}
      >
        <div className="max-w-xl lg:max-w-[32rem]">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy/80 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky" strokeWidth={1.75} />
            Affordable publishing
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]"
          >
            Professional book publishing experts, without the overwhelm.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm leading-relaxed text-navy/75 sm:text-base"
          >
            Whether you are writing your first chapter or ready to launch,
            The Readsy Publishers handles the craft, polish, and publishing
            path so your story reaches real readers.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["Ghostwriting", "Editing", "Design", "Launch"].map((item) => (
              <li
                key={item}
                className="rounded-full bg-white/50 px-3 py-1 text-xs font-medium text-navy/80 backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              onClick={openQuote}
              className="rounded-full border-2 border-navy bg-white text-navy shadow-none hover:bg-white hover:text-navy"
              variant="outline"
            >
              Publish My Book
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </Button>
            <Button
              size="lg"
              variant="navy"
              onClick={openChat}
              className="rounded-full"
            >
              Talk to Us!
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
