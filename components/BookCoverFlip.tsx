"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BookCoverFlipProps = {
  title: string;
  author?: string | null;
  front: string;
  back: string;
  badge?: ReactNode;
  variant?: "card" | "poster";
  className?: string;
};

export function BookCoverFlip({
  title,
  author,
  front,
  back,
  badge,
  variant = "card",
  className,
}: BookCoverFlipProps) {
  const hasBack = back !== front;
  const isPoster = variant === "poster";

  return (
    <div className={cn("group book-perspective w-full", className)}>
      <div
        className={cn(
          "relative aspect-[2/3] w-full cursor-pointer shadow-[0_20px_50px_-20px_rgba(11,31,58,0.55)] transition-shadow duration-500 group-hover:shadow-[0_35px_70px_-24px_rgba(29,169,224,0.5)]",
          isPoster ? "rounded-2xl" : "rounded-lg",
          hasBack
            ? "book-flip"
            : "transition-transform duration-500 group-hover:-translate-y-2",
        )}
      >
        <div
          className={cn(
            "book-face absolute inset-0 overflow-hidden ring-1 ring-black/10 transition-shadow duration-500 group-hover:ring-2 group-hover:ring-sky/60",
            isPoster ? "rounded-2xl" : "rounded-lg",
          )}
        >
          <Image
            src={front}
            alt={`${title} front cover`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes={
              isPoster
                ? "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                : "(max-width: 768px) 50vw, 33vw"
            }
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          {badge ? (
            <div className="absolute left-2.5 top-2.5 z-10">{badge}</div>
          ) : null}
          {isPoster ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3.5 pb-3.5 pt-12 sm:px-4 sm:pb-4">
              <p className="font-display text-sm font-bold leading-snug text-white sm:text-base">
                {title}
              </p>
              {author ? (
                <p className="mt-0.5 text-[11px] text-white/70">By {author}</p>
              ) : hasBack ? (
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Hover to flip
                </p>
              ) : null}
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />
          )}
        </div>
        {hasBack ? (
          <div
            className={cn(
              "book-face book-face-back absolute inset-0 overflow-hidden ring-1 ring-black/10",
              isPoster ? "rounded-2xl" : "rounded-lg",
            )}
          >
            <Image
              src={back}
              alt={`${title} back cover`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/35 to-transparent" />
          </div>
        ) : null}
      </div>
      {!isPoster ? (
        <>
          <p className="mt-3 text-center font-display text-sm font-semibold text-navy transition-colors duration-300 group-hover:text-sky sm:text-base">
            {title}
          </p>
          {hasBack ? (
            <p className="text-center text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Hover to flip
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
