"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { fadeUp, stagger } from "@/lib/motion";
import { useChat } from "./ChatProvider";

export function Hero() {
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-[#f3f6f9]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.14), transparent 36%), radial-gradient(circle at 88% 10%, rgba(11,31,58,0.06), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-sky"
          >
            Ghostwriting · Editing · Publishing
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
          >
            <span className="text-sky">Ready</span> to turn your story into a{" "}
            <span className="text-sky">Masterpiece</span>?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            From first draft to published author, Readsy handles ghostwriting,
            editing, cover design, publishing, and marketing with one dedicated
            studio team.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#quote">
              <Button variant="outline" size="lg">
                Publish Your Work
              </Button>
            </a>
            <Button variant="navy" size="lg" onClick={openChat}>
              Talk To An Expert
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-muted-border pt-6 text-sm text-text-muted"
          >
            <span>2,400+ books delivered</span>
            <span>Confidential process</span>
            <span>Free project consultation</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[1.75rem] bg-sky/10 blur-2xl" />
          <div className="relative rounded-2xl border border-white bg-white p-6 shadow-[0_28px_70px_-36px_rgba(11,31,58,0.45)] sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy">
              Start Your Publishing Journey!
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              Share a few details and our team will reach out with next steps.
            </p>
            <div className="mt-6">
              <HeroLeadForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [smsOk, setSmsOk] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Hero quote:", Object.fromEntries(data.entries()));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-sky-soft px-4 py-10 text-center">
        <p className="font-display text-xl font-semibold text-navy">
          Thank you. We received your request.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          A publishing specialist will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="name"
        required
        placeholder="Full Name"
        className="h-12 w-full rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy outline-none transition placeholder:text-text-muted/70 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        className="h-12 w-full rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy outline-none transition placeholder:text-text-muted/70 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="Phone Number"
        className="h-12 w-full rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy outline-none transition placeholder:text-text-muted/70 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
      />
      <textarea
        name="project"
        required
        rows={3}
        placeholder="Write your thoughts here..."
        className="w-full resize-none rounded-lg border border-muted-border bg-[#fafcfe] px-3.5 py-3 text-sm text-navy outline-none transition placeholder:text-text-muted/70 focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
      />
      <label className="mt-1 flex items-start gap-2.5 text-[11px] leading-relaxed text-text-muted">
        <Checkbox
          checked={smsOk}
          onCheckedChange={(value) => setSmsOk(value === true)}
          className="mt-0.5"
          aria-label="SMS consent"
        />
        <input type="hidden" name="sms_consent" value={smsOk ? "yes" : "no"} />
        <span>
          I agree to receive SMS updates about my project inquiry. Message and
          data rates may apply. Reply STOP to unsubscribe.
        </span>
      </label>
      <Button type="submit" className="mt-1 h-12 w-full uppercase tracking-wide">
        Contact With Us
      </Button>
    </form>
  );
}
