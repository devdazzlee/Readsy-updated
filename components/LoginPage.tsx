"use client";

import { useState, type FormEvent } from "react";
import Link from "./Link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useAuth } from "./AuthProvider";
import { fadeUp, stagger } from "@/lib/motion";

export function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/cover-generator";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log you in.");
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
            "radial-gradient(circle at 12% 20%, rgba(29,169,224,0.16), transparent 36%), radial-gradient(circle at 88% 80%, rgba(11,31,58,0.07), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
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
            Welcome back
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy">
            Log in to your account
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Access your saved requests and the AI Cover Generator.
          </p>

          <div className="mt-7">
            <GoogleSignInButton
              onSuccess={() => router.push(next)}
              onError={(message) => setError(message)}
            />
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-muted-border" />
            or log in with email
            <span className="h-px flex-1 bg-muted-border" />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  id="login-email"
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
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  id="login-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
              loadingText="Logging in..."
            >
              Log In
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?next=${encodeURIComponent(next)}`}
              className="font-semibold text-sky transition hover:text-sky-bright"
            >
              Create one free
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
