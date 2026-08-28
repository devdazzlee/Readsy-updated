"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./AuthProvider";
import type { AuthUser } from "@/lib/api";
import {
  useGetMyActivityQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "@/lib/store/api";
import { errorMessage, type RTKQueryError } from "@/lib/rtkQueryError";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-sky" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-bright text-white">
          <Lock className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h1 className="font-display text-2xl font-bold text-navy">Sign in required</h1>
        <p className="max-w-sm text-sm text-text-muted">
          Log in to view and manage your account.
        </p>
        <Link href="/login?next=/profile">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  return <ProfileShell />;
}

function ProfileShell() {
  const { user, setUser } = useAuth();
  if (!user) return null;

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#f3f6f9] py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(29,169,224,0.14), transparent 36%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative mx-auto max-w-5xl px-4 sm:px-6"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-lg font-bold text-white">
            {user.name.trim().charAt(0).toUpperCase() || "A"}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              My account
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {user.name}
            </h1>
            <p className="text-sm text-text-muted">{user.email}</p>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <ProfileDetailsCard user={user} onUpdated={setUser} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <PasswordCard />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-8">
          <MyActivityCard />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof User;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-3xl border border-muted-border bg-white p-6 shadow-[0_18px_40px_-32px_rgba(11,31,58,0.35)] sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-soft text-sky">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
        </span>
        <div>
          <h2 className="font-display text-base font-bold text-navy">{title}</h2>
          {subtitle ? <p className="text-xs text-text-muted">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ProfileDetailsCard({
  user,
  onUpdated,
}: {
  user: { name: string; email: string; phone: string | null };
  onUpdated: (user: AuthUser) => void;
}) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [success, setSuccess] = useState(false);
  const [updateProfile, { isLoading: loading }] = useUpdateProfileMutation();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const { user: updated } = await updateProfile({ name, phone: phone || undefined }).unwrap();
      onUpdated(updated);
      setSuccess(true);
    } catch (err) {
      setError(errorMessage(err as RTKQueryError, "Could not update your profile."));
    }
  }

  return (
    <Card icon={User} title="Account details" subtitle="Update your name and phone number">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="profile-name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSuccess(false);
              }}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="profile-email"
              value={user.email}
              disabled
              className="pl-9 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
          <p className="text-[11px] text-text-muted">
            Contact us to change the email tied to your account.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-phone">
            Phone <span className="font-normal text-text-muted">(optional)</span>
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setSuccess(false);
              }}
              placeholder="+1 (555) 000-0000"
              className="pl-9"
            />
          </div>
        </div>

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Profile updated
          </p>
        ) : null}

        <Button type="submit" loading={loading} loadingText="Saving..." className="mt-1">
          Save changes
        </Button>
      </form>
    </Card>
  );
}

function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [updatePassword, { isLoading: loading }] = useUpdatePasswordMutation();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(errorMessage(err as RTKQueryError, "Could not update your password."));
    }
  }

  return (
    <Card icon={KeyRound} title="Password" subtitle="Change your account password">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="current-password">Current password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="current-password"
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setSuccess(false);
              }}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-password">New password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="new-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setSuccess(false);
              }}
              placeholder="At least 8 characters"
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="confirm-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setSuccess(false);
              }}
              className="pl-9"
            />
          </div>
        </div>

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Password updated
          </p>
        ) : null}

        <Button type="submit" loading={loading} loadingText="Updating..." className="mt-1">
          Update password
        </Button>
      </form>
    </Card>
  );
}

type ActivityTab = "leads" | "covers";

function MyActivityCard() {
  const { data, isLoading: loading, error: queryError } = useGetMyActivityQuery();
  const leads = data?.leads ?? [];
  const covers = data?.coverRequests ?? [];
  const error = errorMessage(queryError as RTKQueryError, queryError ? "Could not load your activity." : "");
  const [tab, setTab] = useState<ActivityTab>("leads");

  return (
    <div className="rounded-3xl border border-muted-border bg-white p-6 shadow-[0_18px_40px_-32px_rgba(11,31,58,0.35)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-soft text-sky">
            <Clock className="h-4.5 w-4.5" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-display text-base font-bold text-navy">My requests</h2>
            <p className="text-xs text-text-muted">
              Every quote request and cover concept you've submitted to us
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 rounded-full bg-muted p-1">
          <button
            type="button"
            onClick={() => setTab("leads")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              tab === "leads" ? "bg-white text-navy shadow-sm" : "text-text-muted hover:text-navy",
            )}
          >
            Quote requests ({leads.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("covers")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              tab === "covers" ? "bg-white text-navy shadow-sm" : "text-text-muted hover:text-navy",
            )}
          >
            Cover concepts ({covers.length})
          </button>
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-sky" />
          </div>
        ) : error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        ) : tab === "leads" ? (
          leads.length === 0 ? (
            <EmptyActivity text="You haven't submitted a quote or contact request yet." />
          ) : (
            <ul className="space-y-3">
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="rounded-2xl border border-muted-border bg-muted/40 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {lead.source}
                    </span>
                    <span className="text-[11px] text-text-muted">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                  {lead.project ? (
                    <p className="mt-2 text-sm text-navy">{lead.project}</p>
                  ) : (
                    <p className="mt-2 text-sm italic text-text-muted">No project details provided</p>
                  )}
                </li>
              ))}
            </ul>
          )
        ) : covers.length === 0 ? (
          <EmptyActivity text="You haven't generated any cover concepts yet." />
        ) : (
          <ul className="space-y-3">
            {covers.map((item) => (
              <li key={item.id} className="rounded-2xl border border-muted-border bg-muted/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-navy">{item.title}</p>
                  <span className="text-[11px] text-text-muted">{formatDate(item.createdAt)}</span>
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  {item.genre} · {item.style} · {item.imageCount} concept
                  {item.imageCount === 1 ? "" : "s"}
                </p>
                {item.author ? (
                  <p className="mt-1 text-xs text-text-muted">by {item.author}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyActivity({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-muted-border py-10 text-center">
      <Sparkles className="h-5 w-5 text-text-muted" strokeWidth={1.5} />
      <p className="max-w-xs text-sm text-text-muted">{text}</p>
    </div>
  );
}
