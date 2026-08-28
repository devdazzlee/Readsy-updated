import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required for static export (output: "export") — this route has no
// per-request dynamic input, so it's safe to pre-render once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/profile", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
