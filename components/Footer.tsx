import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[rgb(20,29,41)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12 lg:px-10 lg:py-16">
        <div>
          <Image
            src="/images/footer-logo.svg"
            alt="The Readsy"
            width={190}
            height={74}
            className="h-12 w-auto sm:h-[3.25rem]"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            The Readsy is a full publishing studio for aspiring authors.
            Ghostwriting, editing, cover design, publishing, and marketing in
            one place.
          </p>
          <div className="mt-6 flex gap-2.5">
            {[
              { label: "X", href: "#" },
              { label: "in", href: "#" },
              { label: "f", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-xs font-semibold text-white/80 transition hover:border-sky/50 hover:bg-sky/15 hover:text-white"
              >
                {item.label}
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
                <a href={link.href} className="transition hover:text-sky-bright">
                  {link.label}
                </a>
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
                <a
                  href={`#${service.id}`}
                  className="transition hover:text-sky-bright"
                >
                  {service.title}
                </a>
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
                href="mailto:hello@readsy.com"
                className="inline-flex items-center gap-2.5 transition hover:text-sky-bright"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky/15 text-sky-bright">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                hello@readsy.com
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
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} The Readsy. All rights reserved.</p>
          <p>Ghostwriting · Editing · Publishing · Design · Marketing</p>
        </div>
      </div>
    </footer>
  );
}
