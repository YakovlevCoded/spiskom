import type { ComponentProps } from "preact";

import { cn } from "@/lib/utils";

export const Label = ({ class: className, ...props }: ComponentProps<"label">) => (
  <label class={cn("text-sm font-bold text-foreground", className)} {...props} />
);
