import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/40 disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-sky text-white shadow-lg shadow-sky/25 hover:bg-sky-bright hover:shadow-sky/40 hover:-translate-y-0.5",
        navy: "bg-navy text-white shadow-lg shadow-navy/20 hover:bg-navy-deep hover:-translate-y-0.5",
        outline:
          "border-2 border-sky bg-white/80 text-sky backdrop-blur hover:bg-sky-soft hover:-translate-y-0.5",
        ghost: "text-navy hover:bg-muted",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
          <span>{loadingText || "Please wait..."}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export { buttonVariants };
