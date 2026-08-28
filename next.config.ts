import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // Default: every page is indexable. This mirrors the <meta name="robots">
      // tag most pages already send, but as an HTTP header it also covers any
      // non-HTML response and satisfies crawlers/auditors that check the
      // X-Robots-Tag header specifically instead of (or in addition to) the
      // meta tag.
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
      // Utility/account pages stay out of the index — these rules are listed
      // after the catch-all above so they win and override it for these paths.
      {
        source: "/dashboard/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/profile/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/login",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/signup",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/404",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
    ];
  },
};

export default nextConfig;
