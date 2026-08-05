"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/motion";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function ExploreSection() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();

  return (
    <section
      id="explore"
      className="relative scroll-mt-24 overflow-hidden bg-[#9fdfff]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/explore/explore.jpg"
          alt="Author writing ideas in a notebook"
          fill
          className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
          sizes="100vw"
          priority={false}
        />
      </div>

      <motion.div
        className="relative mx-auto flex min-h-[22rem] max-w-6xl items-center px-4 py-16 sm:min-h-[26rem] sm:px-6 sm:py-20 lg:min-h-[30rem] lg:py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <div className="max-w-xl rounded-3xl bg-[#9fdfff]/85 p-6 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-0 lg:max-w-lg xl:max-w-xl">
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-navy/80"
          >
            Stop worrying about publishing books!
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            Explore Endless Possibilities To Publish A Book!
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm leading-relaxed text-navy/75 sm:text-base"
          >
            Join our online book publishing services to become a published
            author. Share your project details now!
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={openQuote}
              className="rounded-full border-2 border-navy bg-white text-navy hover:bg-white hover:text-navy"
            >
              Publish My Book
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
