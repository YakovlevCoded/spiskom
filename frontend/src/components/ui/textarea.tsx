import type { ComponentProps } from "preact";

import { cn } from "@/lib/utils";

export const Textarea = ({ class: className, ...props }: ComponentProps<"textarea">) => (
  <textarea
    class={cn(
      "min-h-28 w-full resize-y rounded-xl border border-input bg-card px-3.5 py-3 text-[15px] leading-6 text-foreground shadow-sm transition outline-none placeholder:text-muted-foreground/65 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/15",
      className,
    )}
    {...props}
  />
);
