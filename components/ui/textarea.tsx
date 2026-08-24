import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[132px] w-full resize-none rounded-xl border border-muted-border bg-[#fafcfe] px-3.5 py-3 text-sm text-navy shadow-sm outline-none transition placeholder:text-text-muted/70 focus-visible:border-sky focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-sky/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
