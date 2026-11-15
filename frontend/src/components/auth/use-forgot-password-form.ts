import { useState } from "preact/hooks";

import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import { getErrorMessage, getFieldErrors } from "@/lib/errors";
import { forgotPasswordSchema } from "@/schemas/auth";
import type { FormErrors } from "@/types/api";

export const useForgotPasswordForm = () => {
  const { request, isPending } = useForgotPassword();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const submit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const parsed = forgotPasswordSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setFormError("");

    try {
      await request(parsed.data.email);
      setIsSent(true);
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  return { errors, formError, isPending, isSent, submit };
};
