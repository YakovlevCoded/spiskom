import type { ComponentChildren } from "preact";

import { Label } from "./label";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: ComponentChildren;
  children: ComponentChildren;
}

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
