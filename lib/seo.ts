import type { Metadata } from "next";

export const SITE_URL = "https://thereadsypublishers.com";
export const SITE_NAME = "The Readsy Publishers";
export const SITE_PHONE = "+1-737-394-5403";
export const SITE_EMAIL = "contact@thereadsypublishers.com";
export const OG_IMAGE = "/logo-new.webp";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/thereadsy",
  instagram: "https://www.instagram.com/thereadsy/",
  linkedin: "https://www.linkedin.com/company/thereadsy",
} as const;

/**
 * Builds a full, consistent Metadata object (title, description, canonical,
 * Open Graph, Twitter card) for a page from just its title/description/path
 * — every route gets the same SEO scaffolding without repeating it 20+ times.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path || "/" },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      alternateLocale: ["en_GB"],
      images: [{ url: OG_IMAGE, width: 1106, height: 456, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    other: {
      publisher: SITE_NAME,
    },
  };
}

// ---- schema.org JSON-LD builders ----

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${OG_IMAGE}`,
    description:
      "Full-service ghostwriting, editing, publishing, cover design, and book marketing for authors in the US and UK.",
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_PHONE,
        email: SITE_EMAIL,
        contactType: "customer service",
        areaServed: ["US", "GB"],
        availableLanguage: ["English"],
      },
    ],
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  price,
}: {
  name: string;
  description: string;
  path: string;
  price?: string;
}) {
  const numericPrice = price ? price.replace(/[^0-9.]/g, "") : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: `${name} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    ...(numericPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: numericPrice,
            url: `${SITE_URL}${path}`,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
