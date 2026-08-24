"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, MessageCircle, Minus, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { sendChatMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useChat } from "./ChatProvider";
import { ProtectedAiContent } from "./ProtectedAiContent";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER: Msg = {
  role: "assistant",
  content:
    "Welcome to The Readsy Publishers. I can help with ghostwriting, editing, publishing, cover design, and book marketing. What are you working on?",
};

const SUGGESTIONS = [
  "How does ghostwriting work?",
  "I need a book cover",
  "Publishing on Amazon",
];

export function ChatWidget() {
  const { isOpen, closeChat, toggleChat } = useChat();
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Msg[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const payload = nextMessages.slice(1);
      const reply = await sendChatMessage(payload);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div id="live-chat" className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex h-[min(72vh,560px)] w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-[#f7f9fc] shadow-[0_40px_100px_-40px_rgba(6,21,38,0.65)]"
          >
            <div className="relative overflow-hidden bg-navy px-5 py-4 text-white">
              <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-sky/20 blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <MessageCircle className="h-5 w-5 text-sky-bright" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-display text-[15px] font-semibold tracking-tight">
                      Live Chat Support
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/65">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Online · The Readsy Publishers services only
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={closeChat}
                    className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                    aria-label="Minimize chat"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={closeChat}
                    className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={listRef}
              className="ai-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={`${msg.role}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] px-3.5 py-2.5 text-[13px] leading-relaxed",
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-md bg-navy text-white"
                        : "rounded-2xl rounded-bl-md border border-navy/8 bg-white text-navy shadow-sm",
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <ProtectedAiContent>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-navy">
                                {children}
                              </strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => <li>{children}</li>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </ProtectedAiContent>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => void send(item)}
                      className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[11px] font-medium text-navy/80 transition hover:border-sky/40 hover:text-sky"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-navy/8 bg-white px-4 py-3 shadow-sm">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-navy/35"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: d * 0.15,
                          }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-navy/8 bg-white px-3 py-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-navy/10 bg-[#f7f9fc] p-1.5 focus-within:border-sky/50 focus-within:ring-2 focus-within:ring-sky/15">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    loading
                      ? "Sending your message..."
                      : "Ask about publishing, editing, covers..."
                  }
                  maxLength={700}
                  disabled={loading}
                  className="h-10 flex-1 bg-transparent px-2.5 text-sm text-navy outline-none placeholder:text-text-muted/70 disabled:cursor-not-allowed disabled:opacity-70"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white transition hover:bg-navy-deep disabled:opacity-40"
                  aria-label={loading ? "Sending message" : "Send"}
                  aria-busy={loading || undefined}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.25} />
                  ) : (
                    <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
                  )}
                </button>
              </div>
              <p className="mt-2 px-1 text-[10px] tracking-wide text-text-muted/80">
                Responses limited to The Readsy Publishers book services
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close live chat" : "Open live chat support"}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "group relative ml-auto flex h-14 items-center justify-center gap-2.5 rounded-full px-5 text-white transition-colors",
          isOpen
            ? "bg-navy shadow-[0_16px_40px_-12px_rgba(20,29,41,0.65)]"
            : "bg-sky shadow-[0_18px_44px_-10px_rgba(29,169,224,0.75)] hover:bg-sky-bright",
        )}
      >
        {!isOpen && (
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-sky/35 opacity-30" />
        )}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              className="relative flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
              <span className="text-sm font-semibold">Close</span>
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="relative flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              <span className="text-sm font-semibold">Live Chat</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
