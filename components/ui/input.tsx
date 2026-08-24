import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-muted-border bg-[#fafcfe] px-3.5 text-sm text-navy shadow-sm outline-none transition placeholder:text-text-muted/70 focus-visible:border-sky focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-sky/20 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
