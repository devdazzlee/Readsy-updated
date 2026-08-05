"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeScale, fadeUp, stagger } from "@/lib/motion";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function StudioCta() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0">
        <Image
          src="/images/sections/library.jpg"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy/90 to-[#0a4f73]/80" />
        <div className="absolute inset-0 grain opacity-20" />
      </div>

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
              className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-bright"
            >
              The Readsy studio
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              One team. One story. From blank page to published book.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Writers, editors, designers, and marketers work as one studio so
              your manuscript never gets lost between freelancers. Stay in
              control. We handle the craft.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {[
                "Dedicated publishing lead",
                "Weekly progress updates",
                "NDA-ready confidentiality",
                "Launch-ready marketing plan",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm text-white/85 backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-bright" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" onClick={openQuote}>
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={openChat}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white",
                )}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Live Chat
              </button>
            </motion.div>
          </div>

          <motion.div variants={fadeScale} className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-sky/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                <Image
                  src="/images/sections/author-team.jpg"
                  alt="Readsy creative team collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                  <p className="font-display text-lg font-semibold text-white">
                    Free manuscript consultation
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Get a clear path for writing, editing, design, or launch.
                  </p>
                  <Button
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
