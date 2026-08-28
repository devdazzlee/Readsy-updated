import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site straight to
  // an `out/` folder every time, ready to upload to Hostinger (or any static
  // host) via File Manager/FTP — no Node server required to serve it.
  //
  // This app is a clean fit for that: no middleware, no app/api routes, no
  // dynamic [param] routes, and no server components fetching per-request
  // data — auth/chat/admin all go through the separate Express API in
  // server/, called client-side, which keeps working the same after export.
  //
  // Static export doesn't support next/image's Image Optimization API (that
  // needs a running server), so images are served unoptimized instead — and
  // it doesn't support headers()/redirects()/rewrites() at all, which is why
  // that's removed below. The X-Robots-Tag headers() previously added here
  // were always redundant with the <meta name="robots"> tag already on
  // every page (lib/seo.ts's pageMetadata()) — removing them doesn't lose
  // any actual protection.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
