import type { FormAlertProps } from "@/types/ui";

export const FormAlert = ({ message }: FormAlertProps) => (
  <div
    role="alert"
    class="rounded-xl border border-destructive/20 bg-destructive/8 px-3.5 py-3 text-sm font-semibold text-destructive"
  >
    {message}
  </div>
);
