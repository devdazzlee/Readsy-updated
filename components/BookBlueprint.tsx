"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Loader2,
  Map,
  Target,
  Users,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { buildBookBlueprint } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { MotionItem, MotionSection } from "@/lib/motion";
import { ProtectedAiContent } from "./ProtectedAiContent";
import { useQuote } from "./QuoteProvider";

const GENRES = [
  "Memoir",
  "Fiction",
  "Business",
  "Self-Help",
  "Children",
  "Faith",
  "Thriller",
  "Other",
];

const GOALS = [
  "Get traditionally published",
  "Self-publish on Amazon",
  "Build authority / brand",
  "Leave a family legacy",
];

const TONES = ["Warm", "Professional", "Bold", "Inspirational", "Literary"];

const markdownComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h3 className="mb-2 mt-5 border-b border-white/10 pb-2 font-display text-base font-semibold text-sky-bright first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-3 text-sm leading-relaxed text-white/88 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-3 list-disc space-y-1.5 pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-3 list-decimal space-y-2 pl-5 last:mb-0">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-sm leading-relaxed text-white/85">{children}</li>
  ),
};

export function BookBlueprint() {
  const { openQuote } = useQuote();
  const [genre, setGenre] = useState("Memoir");
  const [goal, setGoal] = useState(GOALS[1]);
  const [tone, setTone] = useState("Warm");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!idea.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const blueprint = await buildBookBlueprint({
        idea: idea.trim(),
        genre,
        goal,
        tone,
      });
      setResult(blueprint);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Blueprint failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MotionSection
      id="book-blueprint"
      className="scroll-mt-24 relative overflow-hidden bg-muted"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-navy/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky/25 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky">
            <Map className="h-3.5 w-3.5" />
            Readsy exclusive
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.85rem]">
            AI Book Blueprint
          </h2>
          <p className="mt-3 text-base text-text-muted sm:text-lg">
            Most authors stall between idea and first chapter. Get a free
            chapter map, reader profile, title options, and a clear Readsy
            publish path, then turn it into a finished book with our team.
          </p>
        </MotionItem>

        <MotionItem className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Structure the story",
              text: "Chapter-by-chapter plan so you stop guessing.",
            },
            {
              icon: Users,
              title: "Know your reader",
              text: "Clear audience and book promise before writing.",
            },
            {
              icon: BookOpen,
              title: "Path to publish",
              text: "Exact services matched to your project stage.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-muted-border bg-white px-4 py-4 text-left shadow-sm"
            >
              <item.icon className="h-5 w-5 text-sky" strokeWidth={1.75} />
              <p className="mt-3 font-display text-sm font-semibold text-navy">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </MotionItem>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <MotionItem>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-muted-border bg-white p-6 shadow-[0_30px_80px_-48px_rgba(11,31,58,0.35)] sm:p-8"
            >
              <label className="text-sm font-semibold text-navy">Genre</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(g)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      genre === g
                        ? "bg-navy text-white"
                        : "border border-muted-border bg-muted text-text-muted hover:border-sky/40 hover:text-navy"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <label className="mt-5 block text-sm font-semibold text-navy">
                Publishing goal
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      goal === g
                        ? "bg-sky text-white"
                        : "border border-muted-border bg-muted text-text-muted hover:border-sky/40 hover:text-navy"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <label className="mt-5 block text-sm font-semibold text-navy">
                Voice / tone
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      tone === t
                        ? "bg-navy text-white"
                        : "border border-muted-border bg-muted text-text-muted hover:border-sky/40 hover:text-navy"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label
                htmlFor="blueprint-idea"
                className="mt-5 block text-sm font-semibold text-navy"
              >
                Your book idea
              </label>
              <textarea
                id="blueprint-idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={6}
                maxLength={1000}
                required
                placeholder="Example: A business book for first-time founders about raising capital without losing control of the company..."
                className="mt-2 w-full resize-none rounded-2xl border border-muted-border bg-[#fafcfe] px-4 py-3 text-sm leading-relaxed text-navy outline-none transition focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
              />
              <div className="mt-2 flex justify-between text-[11px] text-text-muted">
                <span>Free tool. Converts idea into a usable plan.</span>
                <span>{idea.length}/1000</span>
              </div>

              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={loading || !idea.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Building your blueprint...
                  </>
                ) : (
                  <>
                    Build My Book Blueprint
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </MotionItem>

          <MotionItem>
            <div
              className={`relative flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-gradient-to-br from-navy-deep via-navy to-[#0d4f73] p-6 text-white sm:p-8 ${
                result ? "" : "h-full min-h-[420px]"
              }`}
            >
              <div className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-sky/25 blur-3xl" />
              <div className="relative flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-bright">
                  Your blueprint
                </p>
                {result && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">
                    View only · Copy disabled
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!result && !error && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mt-8 flex flex-1 flex-col justify-center"
                  >
                    <p className="font-display text-2xl font-semibold leading-snug">
                      Titles, chapters, reader profile, and publish path will
                      appear here.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      This is the step most authors skip, then stall for months.
                      Build the blueprint free, then let Readsy write, edit,
                      design, and launch it.
                    </p>
                    <div className="mt-8 space-y-2">
                      {[
                        "Working Titles",
                        "Ideal Reader",
                        "Chapter Blueprint",
                        "Publish Path with Readsy",
                      ].map((label, i) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/80"
                        >
                          <span className="font-display text-xs text-sky-bright">
                            0{i + 1}
                          </span>
                          {label}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mt-12 flex flex-1 flex-col justify-center gap-3"
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-3 rounded-full bg-white/15"
                        style={{ width: `${78 - i * 10}%` }}
                        animate={{ opacity: [0.3, 0.85, 0.3] }}
                        transition={{
                          duration: 1.15,
                          repeat: Infinity,
                          delay: i * 0.12,
                        }}
                      />
                    ))}
                    <p className="mt-4 text-sm text-white/70">
                      Mapping chapters and reader fit...
                    </p>
                  </motion.div>
                )}

                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-8 rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
                  >
                    {error}
                  </motion.p>
                )}

                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-4 flex flex-col"
                  >
                    <ProtectedAiContent className="ai-scroll max-h-[min(60vh,520px)] overflow-y-auto pr-2">
                      <ReactMarkdown components={markdownComponents}>
                        {result}
                      </ReactMarkdown>
                    </ProtectedAiContent>
                    <p className="mt-3 text-[11px] text-white/50">
                      AI output is protected. Work with Readsy to turn this into
                      a finished book.
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <Button className="w-full" onClick={openQuote}>
                        Turn This Into a Book
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                        onClick={openQuote}
                      >
                        Get a Free Quote
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </MotionItem>
        </div>
      </div>
    </MotionSection>
  );
}
