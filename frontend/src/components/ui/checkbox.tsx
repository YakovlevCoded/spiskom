import { Check, LoaderCircle } from "lucide-preact";

import { cn } from "@/lib/utils";
import type { CheckboxProps } from "@/types/ui";

export const Checkbox = ({ checked, disabled, label, onCheckedChange }: CheckboxProps) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={onCheckedChange}
    class={cn(
      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60",
      checked
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-transparent hover:border-ring",
    )}
  >
    {disabled ? (
      <LoaderCircle class="animate-spin text-muted-foreground" size={13} />
    ) : (
      <Check size={14} strokeWidth={3} />
    )}
  </button>
);
