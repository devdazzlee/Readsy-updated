"use client";

import type { ReactNode, ClipboardEvent, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type ProtectedAiContentProps = {
  children: ReactNode;
  className?: string;
};

/** Blocks easy copy/cut/select on AI-generated content. */
export function ProtectedAiContent({
  children,
  className,
}: ProtectedAiContentProps) {
  function blockClipboard(e: ClipboardEvent) {
    e.preventDefault();
  }

  function blockContext(e: MouseEvent) {
    e.preventDefault();
  }

  function blockDrag(e: MouseEvent) {
    e.preventDefault();
  }

  return (
    <div
      className={cn("ai-protected select-none", className)}
      onCopy={blockClipboard}
      onCut={blockClipboard}
      onContextMenu={blockContext}
      onDragStart={blockDrag}
    >
      {children}
    </div>
  );
}
