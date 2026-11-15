import type { FieldProps } from "@/types/ui";

import { Label } from "./label";

export const Field = ({ label, htmlFor, error, hint, children }: FieldProps) => (
  <div class="space-y-2">
    <div class="flex items-center justify-between gap-3">
      <Label for={htmlFor}>{label}</Label>
      {hint}
    </div>
    {children}
    {error ? (
      <p id={`${htmlFor}-error`} class="text-xs font-semibold text-destructive" aria-live="polite">
        {error}
      </p>
    ) : null}
  </div>
);
