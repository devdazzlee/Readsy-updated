"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Phone, ShieldCheck, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./AuthProvider";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

export function AuthModal({
  open,
  onClose,
  onAuthenticated,
  title = "Sign in to continue",
  subtitle = "Create a free account — it takes about 10 seconds.",
}: {
  open: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  title?: string;
  subtitle?: string;
}) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("signup");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Reset transient form state whenever the modal is reopened.
  useEffect(() => {
    if (open) {
      setError("");
      setPassword("");
    }
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup({ name, email, phone: phone || undefined, password });
      } else {
        await login({ email, password });
      }
      onAuthenticated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4"
          role="presentation"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-deep/75 backdrop-blur-[4px]"
            aria-label="Close sign in dialog"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_40px_120px_-40px_rgba(20,29,41,0.75)] outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition hover:bg-muted hover:text-navy"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <div className="px-6 pb-7 pt-8 sm:px-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-bright text-white shadow-md shadow-sky/25">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2
                id="auth-modal-title"
                className="mt-4 font-display text-2xl font-bold tracking-tight text-navy"
              >
                {title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{subtitle}</p>

              <div className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={cn(
                    "rounded-full py-2 text-sm font-semibold transition",
                    mode === "signup" ? "bg-white text-navy shadow-sm" : "text-text-muted hover:text-navy",
                  )}
                >
                  Create account
                </button>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={cn(
                    "rounded-full py-2 text-sm font-semibold transition",
                    mode === "login" ? "bg-white text-navy shadow-sm" : "text-text-muted hover:text-navy",
                  )}
                >
                  Log in
                </button>
              </div>

              <div className="mt-5">
                <GoogleSignInButton
                  text={mode === "signup" ? "signup_with" : "signin_with"}
                  onSuccess={onAuthenticated}
                  onError={(message) => setError(message)}
                />
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
                <span className="h-px flex-1 bg-muted-border" />
                or continue with email
                <span className="h-px flex-1 bg-muted-border" />
              </div>

              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3.5">
                {mode === "signup" ? (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="auth-modal-name">Full name</Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      <Input
                        id="auth-modal-name"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="pl-9"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="auth-modal-email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <Input
                      id="auth-modal-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="pl-9"
                    />
                  </div>
                </div>

                {mode === "signup" ? (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="auth-modal-phone">
                      Phone <span className="font-normal text-text-muted">(optional)</span>
                    </Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      <Input
                        id="auth-modal-phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="pl-9"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="auth-modal-password">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <Input
                      id="auth-modal-password"
                      type="password"
                      required
                      minLength={8}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                      className="pl-9"
                    />
                  </div>
                </div>

                {error ? (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="mt-1 h-11 w-full"
                  loading={loading}
                  loadingText={mode === "signup" ? "Creating account..." : "Logging in..."}
                >
                  {mode === "signup" ? "Create account & continue" : "Log in & continue"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-text-muted">
                  Your details are saved to your account only — nothing here is shared.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
