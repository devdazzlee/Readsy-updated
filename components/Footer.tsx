import Image from "next/image";
import Link from "./Link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/seo";

// lucide-react no longer ships brand/social icons (trademark reasons), so
// these are small inline SVGs matching the same stroke-icon visual weight.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.25-1.5 1.5-1.5H16.5V4.3c-.27-.04-1.2-.11-2.28-.11-2.25 0-3.79 1.37-3.79 3.9V10.5h-2.5v3h2.5V21h2.57z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.15" cy="6.85" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 20h-2.94v-5.9c0-1.4-.5-2.36-1.76-2.36-.96 0-1.53.65-1.78 1.27-.09.22-.11.53-.11.84V20H10.5s.04-9.85 0-10.5h2.91v1.49c.39-.6 1.08-1.46 2.63-1.46 1.92 0 3.36 1.26 3.36 3.95V20z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[rgb(20,29,41)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12 lg:px-10 lg:py-16">
        <div>
          <Image
            src="/logo-new.webp"
            alt="The Readsy Publishers"
            width={1106}
            height={456}
            className="h-14 w-auto brightness-0 invert sm:h-16"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            The Readsy Publishers is a full publishing studio for aspiring authors.
            Ghostwriting, editing, cover design, publishing, and marketing in
            one place.
          </p>
          <div className="mt-6 flex gap-2.5">
            {[
              { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
              { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
              { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`The Readsy Publishers on ${item.label}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-sky/50 hover:bg-sky/15 hover:text-white"
              >
                <item.Icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-sky-bright">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#quote" className="transition hover:text-sky-bright">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.id}`}
                  className="transition hover:text-sky-bright"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-white/65">
            <li>
              <a
                href="tel:+17373945403"
                className="inline-flex items-center gap-2.5 transition hover:text-sky-bright"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky/15 text-sky-bright">
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                +1 737 394 5403
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@thereadsypublishers.com"
                className="inline-flex items-center gap-2.5 transition hover:text-sky-bright"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky/15 text-sky-bright">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                contact@thereadsypublishers.com
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky/15 text-sky-bright">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <span className="leading-relaxed">
                Publishing consultations available nationwide
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} The Readsy Publishers. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <Link href="/privacy" className="transition hover:text-sky-bright">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-sky-bright">
              Terms &amp; Conditions
            </Link>
            <span className="hidden sm:inline">
              Ghostwriting · Editing · Publishing · Design · Marketing
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
