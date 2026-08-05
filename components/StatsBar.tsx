"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/content";
import { fadeUp, stagger } from "@/lib/motion";

export function StatsBar() {
  return (
    <section className="bg-sky-soft">
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:py-14"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="text-center"
          >
            <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
