"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Thin wrapper around next/link that defaults `prefetch` to false.
 *
 * Why: this site is a static export (output: "export" in next.config.ts),
 * hosted on plain Apache (Hostinger) — no Next.js server. Next's link
 * prefetching (on hover / viewport-enter) requests route data as a flat,
 * dotted URL — e.g. /profile/__next.profile.__PAGE__.txt — which only
 * Next's own server knows how to map back to the real nested file on disk
 * (__next.profile/__PAGE__.txt). A plain static file server has no way to
 * do that translation, so every prefetch 404s in the background on every
 * page. Disabling prefetch removes that entirely; normal navigation
 * (client-side route change or a full page load) works identically either
 * way — this only turns off an optimization that can't function on this
 * host, not navigation itself.
 *
 * `prefetch` can still be set explicitly per-link if ever needed.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
