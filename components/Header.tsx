"use client";

import Image from "next/image";
import Link from "./Link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  Phone,
  User as UserIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PRICING_PLANS } from "@/lib/content";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { useChat } from "./ChatProvider";
import { useQuote } from "./QuoteProvider";

export function Header() {
  const { openQuote } = useQuote();
  const { openChat } = useChat();
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // A full page reload, not a client-side router.push. Logout is a security
  // boundary — the only way to *guarantee* no stale state survives it
  // (Redux, RTK Query's cache, React's own component state, Next's client
  // router cache) is to not carry any JS runtime across the transition at
  // all. A soft SPA navigation keeps all of that alive and relies on every
  // subscriber correctly reacting to the cleared token in time, which is a
  // much harder guarantee — this sidesteps that entire class of bug by
  // construction rather than chasing each timing edge case individually.
  function handleLogout() {
    setLoggingOut(true);
    logout();
    window.location.href = "/";
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) setMobileServicesOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-navy/8 bg-white/95 shadow-[0_10px_40px_-24px_rgba(20,29,41,0.35)] backdrop-blur-xl"
          : "border-b border-navy/5 bg-white",
      )}
    >
      <div className="mx-auto grid h-[4.75rem] w-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0 justify-self-start" aria-label="The Readsy Publishers home">
          <Image
            src="/logo-new.webp"
            alt="The Readsy Publishers"
            width={1106}
            height={456}
            className="h-14 w-auto sm:h-16 lg:h-[4.25rem]"
            priority
          />
        </Link>

        <nav className="hidden justify-self-center lg:flex lg:items-center lg:gap-1 xl:gap-2">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className={cn(
                "group relative flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition xl:px-3",
                servicesOpen || pathname === "/pricing"
                  ? "text-navy"
                  : "text-text-muted hover:text-navy",
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  servicesOpen && "rotate-180",
                )}
                strokeWidth={2}
              />
              <span
                className={cn(
                  "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-sky transition duration-300",
                  servicesOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </button>

            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full z-50 mt-3 w-[30rem] -translate-x-1/2 rounded-2xl border border-navy/8 bg-white p-4 shadow-[0_30px_70px_-24px_rgba(11,31,58,0.35)]"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {PRICING_PLANS.map((plan) => (
                      <Link
                        key={plan.id}
                        href={`/services/${plan.id}`}
                        onClick={() => setServicesOpen(false)}
                        className="group/item flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition hover:bg-sky-soft"
                      >
                        <span className="text-[13px] font-medium text-navy group-hover/item:text-sky">
                          {plan.title}
                        </span>
                        <span className="whitespace-nowrap text-[11px] text-text-muted">
                          from {plan.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-muted-border pt-3">
                    <Link
                      href="/pricing"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-center rounded-xl bg-muted px-3 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-sky-soft hover:text-sky"
                    >
                      View all services & pricing
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition xl:px-3",
                  isActive ? "text-navy" : "text-text-muted hover:text-navy",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-sky transition duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          {loading ? (
            <div
              aria-hidden
              className="hidden h-10 w-[92px] animate-pulse rounded-full bg-muted sm:block"
            />
          ) : user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {user.isAdmin ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-full px-4",
                  )}
                >
                  Dashboard
                </Link>
              ) : null}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    title={user.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-white transition hover:bg-navy-deep"
                  >
                    {user.name.trim().charAt(0).toUpperCase() || "A"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="normal-case tracking-normal">
                    <span className="block truncate text-sm font-semibold text-navy">
                      {user.name}
                    </span>
                    <span className="block truncate text-xs font-normal text-text-muted">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserIcon className="h-4 w-4 text-text-muted" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive disabled={loggingOut} onClick={handleLogout}>
                    {loggingOut ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    {loggingOut ? "Logging out..." : "Log out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden rounded-full px-4 sm:inline-flex",
              )}
            >
              Log In
            </Link>
          )}
          <a
            href="tel:+17373945403"
            className="mr-1 hidden items-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium text-navy/70 transition hover:text-navy xl:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-sky" strokeWidth={1.75} />
            <span className="tabular-nums">+1 737 394 5403</span>
          </a>
          <Button
            variant="navy"
            size="sm"
            onClick={openQuote}
            className="hidden rounded-full px-4 sm:inline-flex lg:px-5"
          >
            Get a Quote
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={openChat}
            className="hidden rounded-full px-4 shadow-sky/30 sm:inline-flex lg:px-5"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Live Chat
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-navy/8 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-sky-soft"
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    mobileServicesOpen && "rotate-180",
                  )}
                  strokeWidth={2}
                />
              </button>
              <AnimatePresence initial={false}>
                {mobileServicesOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-2"
                  >
                    <div className="space-y-0.5 border-l border-muted-border py-1 pl-3">
                      {PRICING_PLANS.map((plan) => (
                        <Link
                          key={plan.id}
                          href={`/services/${plan.id}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-sky-soft hover:text-navy"
                        >
                          {plan.title}
                          <span className="whitespace-nowrap text-[11px] text-text-muted/70">
                            from {plan.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-sky-soft",
                    pathname === link.href
                      ? "bg-sky-soft text-navy"
                      : "text-navy",
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+17373945403"
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-sky-soft"
              >
                <Phone className="h-4 w-4 text-sky" strokeWidth={1.75} />
                +1 737 394 5403
              </a>
              <div className="mt-3 grid gap-2 border-t border-navy/8 pt-3">
                {loading ? (
                  <div className="h-11 animate-pulse rounded-xl bg-muted" />
                ) : user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl border border-muted-border px-3 py-2.5 text-center text-sm font-medium text-navy hover:bg-sky-soft"
                    >
                      My Profile
                    </Link>
                    {user.isAdmin ? (
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-xl border border-muted-border px-3 py-2.5 text-center text-sm font-medium text-navy hover:bg-sky-soft"
                      >
                        Dashboard
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      disabled={loggingOut}
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/60 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loggingOut ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                      {loggingOut ? "Logging out..." : `Log out (${user.name.split(" ")[0]})`}
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl border border-muted-border px-3 py-2.5 text-center text-sm font-medium text-navy hover:bg-sky-soft"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl bg-navy px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-navy-deep"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                <Button
                  variant="navy"
                  className="rounded-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openQuote();
                  }}
                >
                  Get a Quote
                </Button>
                <Button
                  variant="primary"
                  className="rounded-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openChat();
                  }}
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  Live Chat
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
