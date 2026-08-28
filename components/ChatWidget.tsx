"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, Mail, MessageCircle, Minus, User, X } from "lucide-react";
import { sendChatMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { ChatMarkdown } from "./ChatMarkdown";
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

const CLIENT_ID_KEY = "readsy_chat_client_id";
const IDENTITY_KEY = "readsy_chat_identity";

function getClientId() {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(CLIENT_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

type Identity = { name: string; email: string } | null;

function getStoredIdentity(): Identity {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(IDENTITY_KEY);
    return raw ? (JSON.parse(raw) as Identity) : null;
  } catch {
    return null;
  }
}

export function ChatWidget() {
  const { isOpen, closeChat, toggleChat } = useChat();
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState("");
  const [identity, setIdentity] = useState<Identity>(null);
  const [identityDismissed, setIdentityDismissed] = useState(false);
  // Explicitly re-opens the capture form even if we already have identity
  // stored (e.g. the visitor asks to share/update their details, or taps
  // "Not you?") — the automatic prompt below only fires once, so this is
  // the only way back to the form after that.
  const [forceIdentityPrompt, setForceIdentityPrompt] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClientId(getClientId());
    setIdentity(getStoredIdentity());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen, loading]);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showIdentityPrompt =
    isOpen &&
    !identityDismissed &&
    (forceIdentityPrompt || (!identity && userMessageCount >= 1));

  function saveIdentity(next: { name: string; email: string }) {
    setIdentity(next);
    setForceIdentityPrompt(false);
    setIdentityDismissed(false);
    try {
      window.localStorage.setItem(IDENTITY_KEY, JSON.stringify(next));
    } catch {
      // Non-critical — identity just won't persist across page reloads.
    }
  }

  function clearIdentity() {
    setIdentity(null);
    setForceIdentityPrompt(true);
    try {
      window.localStorage.removeItem(IDENTITY_KEY);
    } catch {
      // Non-critical.
    }
  }

  // Lets a visitor trigger the contact-details form just by asking for it in
  // plain language, instead of only ever showing it automatically once.
  const SHARE_INTENT_RE =
    /\b(my\s+(email|e-mail|phone|number|name)\s+is|(share|give|leave|provide)\s+(my\s+)?(email|e-mail|phone|number|name|contact|details)|contact\s+(me|info|details)|reach\s+(out\s+to\s+)?me|call\s+me\s+back)\b/i;

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (SHARE_INTENT_RE.test(trimmed)) {
      setIdentityDismissed(false);
      setForceIdentityPrompt(true);
    }

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
      const reply = await sendChatMessage(payload, {
        clientId,
        name: identity?.name,
        email: identity?.email,
      });
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
                        <ChatMarkdown content={msg.content} />
                      </ProtectedAiContent>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {showIdentityPrompt ? (
                <IdentityCapture
                  initialName={identity?.name}
                  initialEmail={identity?.email}
                  onSave={saveIdentity}
                  onDismiss={() => {
                    setIdentityDismissed(true);
                    setForceIdentityPrompt(false);
                  }}
                />
              ) : null}

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

            {identity && !showIdentityPrompt ? (
              <div className="flex items-center justify-between gap-2 border-t border-navy/8 bg-sky-soft/40 px-4 py-1.5 text-[11px] text-navy/70">
                <span className="truncate">
                  Chatting as <span className="font-semibold text-navy">{identity.name}</span>
                </span>
                <button
                  type="button"
                  onClick={clearIdentity}
                  className="shrink-0 font-semibold text-sky hover:text-sky-bright"
                >
                  Not you?
                </button>
              </div>
            ) : null}

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

function IdentityCapture({
  initialName,
  initialEmail,
  onSave,
  onDismiss,
}: {
  initialName?: string;
  initialEmail?: string;
  onSave: (identity: { name: string; email: string }) => void;
  onDismiss: () => void;
}) {
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSave({ name: name.trim(), email: email.trim() });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-sky/25 bg-sky-soft/50 p-3.5"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-semibold text-navy">
          {initialName
            ? "Update your contact details"
            : "Want a specialist to follow up on this chat?"}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-0.5 text-navy/40 hover:text-navy"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-2.5 flex flex-col gap-1.5">
        <div className="relative">
          <User className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-9 w-full rounded-lg border border-white bg-white pl-8 pr-2.5 text-xs text-navy outline-none focus:border-sky"
          />
        </div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-9 w-full rounded-lg border border-white bg-white pl-8 pr-2.5 text-xs text-navy outline-none focus:border-sky"
          />
        </div>
        <button
          type="submit"
          disabled={!name.trim() || !email.trim()}
          className="mt-0.5 h-9 rounded-lg bg-sky text-xs font-semibold text-white transition hover:bg-sky-bright disabled:opacity-50"
        >
          {initialName ? "Update details" : "Share details"}
        </button>
      </form>
    </motion.div>
  );
}
