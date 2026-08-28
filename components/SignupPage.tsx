"use client";

import { useState, type FormEvent } from "react";
import Link from "./Link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useAuth } from "./AuthProvider";
import { fadeUp, stagger } from "@/lib/motion";

export function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/cover-generator";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ name, email, phone: phone || undefined, password });
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#f3f6f9] py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 12% 80%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative mx-auto w-full max-w-xl px-4 sm:px-6"
      >
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-muted-border bg-white p-8 shadow-[0_30px_80px_-48px_rgba(11,31,58,0.35)] sm:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Free account
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Unlock the AI Cover Generator and save your requests.
          </p>

          <div className="mt-7">
            <GoogleSignInButton
              text="signup_with"
              intent="signup"
              onSuccess={() => router.push(next)}
              onError={(message) => setError(message)}
            />
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-muted-border" />
            or sign up with email
            <span className="h-px flex-1 bg-muted-border" />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="signup-name">Full name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  id="signup-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <Input
                    id="signup-email"
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
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="signup-phone">
                  Phone <span className="font-normal text-text-muted">(optional)</span>
                </Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  id="signup-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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
              className="mt-2 h-12 w-full"
              loading={loading}
              loadingText="Creating account..."
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-text-muted">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="underline hover:text-navy">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-navy">
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              href={`/login?next=${encodeURIComponent(next)}`}
              className="font-semibold text-sky transition hover:text-sky-bright"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
