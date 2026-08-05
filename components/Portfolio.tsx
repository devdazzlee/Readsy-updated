"use client";

import { BOOK_COVERS } from "@/lib/content";
import { MotionItem, MotionSection } from "@/lib/motion";
import { BookCoverFlip } from "./BookCoverFlip";

export function Portfolio() {
  return (
    <MotionSection
      id="portfolio"
      className="scroll-mt-24 bg-gradient-to-b from-surface via-sky-soft/40 to-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MotionItem className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            Published work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Books we helped bring to life
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Hover any cover to reveal the back. Real titles from authors who
            trusted Readsy with their story.
          </p>
        </MotionItem>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
          {BOOK_COVERS.map((book) => (
            <MotionItem key={book.slug}>
              <BookCoverFlip
                title={book.title}
                front={book.front}
                back={book.back}
              />
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
