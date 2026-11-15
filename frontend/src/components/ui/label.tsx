import { cn } from "@/lib/utils";
import type { LabelProps } from "@/types/ui";

export const Label = ({ class: className, ...props }: LabelProps) => (
  <label class={cn("text-sm font-bold text-foreground", className)} {...props} />
);
