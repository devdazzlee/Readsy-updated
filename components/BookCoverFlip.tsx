"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type BookCoverFlipProps = {
  title: string;
  front: string;
  back: string;
  className?: string;
};

export function BookCoverFlip({
  title,
  front,
  back,
  className,
}: BookCoverFlipProps) {
  return (
    <div className={cn("group book-perspective w-full", className)}>
      <div className="book-flip relative aspect-[2/3] w-full cursor-pointer rounded-lg shadow-[0_20px_50px_-20px_rgba(11,31,58,0.55)]">
        <div className="book-face absolute inset-0 overflow-hidden rounded-lg ring-1 ring-black/10">
          <Image
            src={front}
            alt={`${title} front cover`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>
        <div className="book-face book-face-back absolute inset-0 overflow-hidden rounded-lg ring-1 ring-black/10">
          <Image
            src={back}
            alt={`${title} back cover`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/35 to-transparent" />
        </div>
      </div>
      <p className="mt-3 text-center font-display text-sm font-semibold text-navy sm:text-base">
        {title}
      </p>
      <p className="text-center text-[11px] uppercase tracking-[0.16em] text-text-muted">
        Hover to flip
      </p>
    </div>
  );
}
