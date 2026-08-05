"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Wand2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { analyzeBookIdea } from "@/lib/api";
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
  "Religion",
  "Other",
];

export function AiConcierge() {
  const { openQuote } = useQuote();
  const [genre, setGenre] = useState("Memoir");
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
      const analysis = await analyzeBookIdea(idea.trim(), genre);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MotionSection
      id="ai-concierge"
      className="scroll-mt-24 relative overflow-hidden bg-surface"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky">
            <Wand2 className="h-3.5 w-3.5" />
            New for authors
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            AI Book Concierge
          </h2>
          <p className="mt-3 text-base text-text-muted sm:text-lg">
            Paste your idea. Get strengths, gaps, and the exact Readsy services
            that fit. A free first step before your consultation.
          </p>
        </MotionItem>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
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

              <label
                htmlFor="book-idea"
                className="mt-6 block text-sm font-semibold text-navy"
              >
                Your book idea
              </label>
              <textarea
                id="book-idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={6}
                maxLength={900}
                required
                placeholder="Example: A memoir about rebuilding life after loss, written for readers who need hope and practical faith..."
                className="mt-2 w-full resize-none rounded-2xl border border-muted-border bg-[#fafcfe] px-4 py-3 text-sm leading-relaxed text-navy outline-none transition focus:border-sky focus:bg-white focus:ring-2 focus:ring-sky/20"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-text-muted">
                <span>Kept private. Used only for this analysis.</span>
                <span>{idea.length}/900</span>
              </div>

              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={loading || !idea.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing idea...
                  </>
                ) : (
                  <>
                    Analyze My Idea
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </MotionItem>

          <MotionItem>
            <div
              className={`relative flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-gradient-to-br from-navy to-[#123a63] p-6 text-white sm:p-8 ${
                result ? "" : "h-full min-h-[360px]"
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky/30 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-sky-bright">
                Concierge insight
              </p>

              <AnimatePresence mode="wait">
                {!result && !error && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mt-6 flex flex-1 flex-col justify-center"
                  >
                    <p className="font-display text-2xl font-semibold leading-snug">
                      Your personalized publishing brief appears here.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      We highlight concept strength, gaps to fix, and which
                      Readsy services will move you from idea to published
                      author fastest.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {["Concept Snapshot", "Service Match", "Gap Analysis", "Next Step"].map(
                        (label) => (
                          <div
                            key={label}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-medium text-white/80"
                          >
                            {label}
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mt-10 flex flex-1 flex-col items-start justify-center gap-3"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-3 rounded-full bg-white/15"
                        style={{ width: `${70 - i * 12}%` }}
                        animate={{ opacity: [0.35, 0.85, 0.35] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                    <p className="mt-4 text-sm text-white/70">
                      Reading your concept like an editor...
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
                    className="relative mt-5 flex flex-col"
                  >
                    <ProtectedAiContent className="ai-insight ai-scroll max-h-[min(55vh,480px)] overflow-y-auto pr-2 text-sm leading-relaxed text-white/90">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0">{children}</p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-sky-bright">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-3 list-disc space-y-1.5 pl-5 last:mb-0">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-3 list-decimal space-y-1.5 pl-5 last:mb-0">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-white/85">{children}</li>
                          ),
                          h1: ({ children }) => (
                            <h3 className="mb-2 font-display text-base font-semibold text-white">
                              {children}
                            </h3>
                          ),
                          h2: ({ children }) => (
                            <h3 className="mb-2 font-display text-base font-semibold text-white">
                              {children}
                            </h3>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mb-2 font-display text-base font-semibold text-white">
                              {children}
                            </h3>
                          ),
                        }}
                      >
                        {result}
                      </ReactMarkdown>
                    </ProtectedAiContent>
                    <p className="mt-3 text-[11px] text-white/50">
                      View only. Copying AI insights is disabled.
                    </p>
                    <Button
                      className="mt-4 w-full"
                      onClick={openQuote}
                    >
                      Continue with a Free Quote
                    </Button>
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
