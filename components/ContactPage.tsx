"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitQuote } from "@/lib/api";
import { SERVICES } from "@/lib/content";
import { fadeScale, fadeUp, MotionItem, MotionSection, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useChat } from "./ChatProvider";

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Call the studio",
    value: "+1 737 394 5403",
    href: "tel:+17373945403",
    hint: "Mon–Fri, 9am–6pm CT",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "contact@thereadsypublishers.com",
    href: "mailto:contact@thereadsypublishers.com",
    hint: "We reply within one business day",
  },
  {
    icon: MapPin,
    label: "Meet virtually",
    value: "Nationwide consultations",
    href: "mailto:contact@thereadsypublishers.com",
    hint: "Zoom, phone, or email — your choice",
  },
] as const;

const PROMISES = [
  { icon: Clock3, title: "Fast reply", text: "A specialist follows up within 24 hours." },
  { icon: Sparkles, title: "Custom plan", text: "Writing, editing, design, or launch — mapped to you." },
  { icon: MessageCircle, title: "Live help", text: "Chat with the team anytime from this page." },
] as const;

const OFFICE_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM CT" },
  { day: "Saturday", hours: "10:00 AM – 2:00 PM CT" },
  { day: "Sunday", hours: "Closed" },
] as const;

const WHY_REACH_OUT = [
  {
    icon: ShieldCheck,
    title: "Confidential by default",
    text: "Every conversation and manuscript is covered by an NDA-ready process.",
  },
  {
    icon: Sparkles,
    title: "One dedicated lead",
    text: "A single publishing specialist maps your plan and stays with your project.",
  },
  {
    icon: Clock3,
    title: "No pressure, no spam",
    text: "You get a clear proposal, not a sales script. Reply on your own schedule.",
  },
] as const;

const FAQS = [
  {
    q: "How soon will someone respond?",
    a: "A publishing specialist reviews every message and replies within one business day — often the same afternoon.",
  },
  {
    q: "Do I need a finished manuscript to reach out?",
    a: "No. Many authors contact us with just an idea. We help shape the outline, then move into writing, editing, or design.",
  },
  {
    q: "Is my project kept confidential?",
    a: "Yes. Every inquiry and manuscript is handled under a confidentiality-first process, with NDAs available on request.",
  },
  {
    q: "Can we talk over video instead of email?",
    a: "Absolutely. Mention it in your message or use Live Chat and we will schedule a Zoom or phone consultation.",
  },
] as const;

export function ContactPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FormSection />
      <InfoCardsSection />
      <MapSection />
      <FaqSection />
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

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-sky"
          >
            Contact The Readsy Publishers
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.35rem]"
          >
            Let&apos;s turn your story into a{" "}
            <span className="text-sky">published masterpiece</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Tell us about your book idea, manuscript, or launch goal. A
            publishing specialist will map the next steps for ghostwriting,
            editing, design, and marketing.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact-form">
              <Button variant="primary" size="lg">
                Send a message
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <Button variant="navy" size="lg" onClick={openChat}>
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Live Chat
            </Button>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 grid gap-3 sm:grid-cols-3">
            {PROMISES.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white bg-white/80 p-4 shadow-[0_18px_40px_-32px_rgba(11,31,58,0.45)] backdrop-blur"
              >
                <item.icon className="h-5 w-5 text-sky" strokeWidth={1.75} />
                <p className="mt-3 font-display text-sm font-semibold text-navy">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-sky/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(11,31,58,0.5)]">
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <Image
                src="/images/sections/promo-author.jpg"
                alt="Author reviewing their published book with The Readsy Publishers team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                  2,400+ authors published
                </p>
                <p className="mt-1 text-sm text-white/70">
                  From first draft to bestseller shelf — we walk every step
                  with you.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCardsSection() {
  return (
    <section className="bg-surface">
      <motion.div
        className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {CONTACT_CARDS.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            variants={fadeScale}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-muted-border bg-muted/40 p-5 transition hover:border-sky/30 hover:bg-sky-soft/60"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-sky">
              <item.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-sky">
              {item.label}
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold text-navy">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-text-muted">{item.hint}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

function MapSection() {
  return (
    <MotionSection id="visit" className="scroll-mt-24 bg-muted/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <MotionItem className="relative order-2 lg:order-1">
          <div className="absolute -inset-3 rounded-[1.75rem] bg-sky/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white shadow-[0_30px_80px_-40px_rgba(11,31,58,0.4)]">
            <iframe
              title="The Readsy Publishers studio location — Austin, Texas"
              src="https://maps.google.com/maps?q=Austin,%20Texas&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="h-[320px] w-full grayscale-[15%] sm:h-[420px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+14px)]"
            >
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute h-9 w-9 animate-ping rounded-full bg-sky/40" />
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-sky text-white shadow-lg shadow-sky/40">
                  <MapPin className="h-4 w-4" strokeWidth={2} />
                </span>
              </span>
            </motion.div>
          </div>
        </MotionItem>

        <MotionItem className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Our home base
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Based in Austin, working nationwide
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-text-muted">
            Our studio calls Austin, Texas home — but our authors are
            everywhere. Every consultation happens by phone, email, or video,
            so location never gets in the way of your book.
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl border border-muted-border bg-white p-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                <MapPin className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-navy">
                  Austin, Texas
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  Serving authors across the United States, remotely
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-muted-border bg-white p-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                <Clock3 className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="w-full">
                <p className="font-display text-sm font-semibold text-navy">
                  Studio hours
                </p>
                <dl className="mt-1.5 space-y-1">
                  {OFFICE_HOURS.map((row) => (
                    <div
                      key={row.day}
                      className="flex items-center justify-between gap-4 text-xs text-text-muted"
                    >
                      <dt>{row.day}</dt>
                      <dd className="font-medium text-navy">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/maps?q=Austin,%20Texas"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky transition hover:text-sky-bright"
          >
            <Navigation className="h-4 w-4" strokeWidth={1.75} />
            Get directions
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function FormSection() {
  return (
    <MotionSection id="contact-form" className="scroll-mt-24 relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-muted-border to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <MotionItem>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Start the conversation
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Send us your story. We&apos;ll map the path forward.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-text-muted">
            Fill out the form and a publishing specialist will follow up with
            a clear, no-pressure plan for your project.
          </p>

          <ul className="mt-9 space-y-4">
            {WHY_REACH_OUT.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-muted-border bg-white/70 p-4 backdrop-blur transition hover:border-sky/30 hover:bg-sky-soft/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </MotionItem>

        <MotionItem variants={fadeScale} className="relative lg:sticky lg:top-28">
          <div className="absolute -inset-3 rounded-[1.75rem] bg-sky/15 blur-2xl" />
          <Card className="relative border-white bg-white/95 p-0 backdrop-blur">
            <CardHeader className="px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
              <CardTitle className="text-2xl">Tell us about your project</CardTitle>
              <CardDescription>
                Share a few details and we will reach out with a clear next
                step.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <ContactForm />
            </CardContent>
          </Card>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function FaqSection() {
  return (
    <MotionSection id="faq" className="scroll-mt-24 bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Got questions?
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-text-muted">
            Everything authors usually ask before reaching out. Still curious?
            Send a message and we will answer directly.
          </p>
        </MotionItem>

        <MotionItem className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-muted/40 transition",
        open ? "border-sky/30 bg-sky-soft/40" : "border-muted-border hover:border-sky/25",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy"
        aria-expanded={open}
      >
        {question}
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
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const CUSTOM_INTEREST = "Something else";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [smsOk, setSmsOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState<string>(SERVICES[0].title);
  const [customInterest, setCustomInterest] = useState("");
  const isCustom = interest === CUSTOM_INTEREST;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const message = String(data.get("message") || "");
    const interestLabel = isCustom
      ? customInterest.trim() || CUSTOM_INTEREST
      : interest;

    try {
      await submitQuote({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        project: `Interest: ${interestLabel}\n\n${message}`,
        smsConsent: smsOk ? "yes" : "no",
        source: "contact",
      });
      setSubmitted(true);
      form.reset();
      setSmsOk(false);
      setInterest(SERVICES[0].title);
      setCustomInterest("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl bg-sky-soft px-4 py-12 text-center"
      >
        <p className="font-display text-xl font-semibold text-navy">
          Thank you. We received your message.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          A publishing specialist will contact you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <fieldset disabled={loading} className="contents">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-name">Full name</Label>
            <Input
              id="contact-name"
              name="name"
              required
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </div>
        {/* "I need help with" service selector — hidden per request
        <div className="flex flex-col gap-2">
          <Label>I need help with</Label>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setInterest(service.title)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  interest === service.title
                    ? "border-sky bg-sky text-white shadow-sm shadow-sky/25"
                    : "border-muted-border bg-white text-text-muted hover:border-sky/40 hover:text-navy",
                )}
              >
                {service.title}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setInterest(CUSTOM_INTEREST)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                isCustom
                  ? "border-sky bg-sky text-white shadow-sm shadow-sky/25"
                  : "border-dashed border-muted-border bg-white text-text-muted hover:border-sky/40 hover:text-navy",
              )}
            >
              Something else
            </button>
          </div>
          <AnimatePresence initial={false}>
            {isCustom ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <Input
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  required={isCustom}
                  placeholder="Tell us what you need help with"
                  aria-label="Describe what you need help with"
                  className="mt-2"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-message">Your message</Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your book idea, manuscript, or publishing goals..."
          />
        </div>
        <label className="flex items-start gap-2.5 text-[11px] leading-relaxed text-text-muted">
          <Checkbox
            checked={smsOk}
            onCheckedChange={(value) => setSmsOk(value === true)}
            className="mt-0.5"
            aria-label="SMS consent"
          />
          <span>
            I agree to receive SMS updates about my project inquiry. Message
            and data rates may apply. Reply STOP to unsubscribe.
          </span>
        </label>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          type="submit"
          className="mt-1 h-12 w-full uppercase tracking-wide"
          loading={loading}
          loadingText="Sending..."
        >
          <Send className="h-4 w-4" strokeWidth={1.75} />
          Contact With Us
        </Button>
      </fieldset>
    </form>
  );
}
