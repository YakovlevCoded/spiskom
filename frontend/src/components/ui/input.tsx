import type { ComponentProps } from "preact";

import { cn } from "@/lib/utils";

export const Input = ({ class: className, ...props }: ComponentProps<"input">) => (
  <input
    class={cn(
      "h-11 w-full rounded-xl border border-input bg-card px-3.5 text-[15px] text-foreground shadow-sm transition outline-none placeholder:text-muted-foreground/65 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/15",
      className,
    )}
    {...props}
  />
);
