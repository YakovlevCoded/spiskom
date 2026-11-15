import { useState } from "preact/hooks";

import { forgotPasswordRequest } from "../../api/auth";
import { getErrorMessage, getFieldErrors } from "../../lib/errors";
import { forgotPasswordSchema } from "../../schemas/auth";
import type { FormErrors } from "../../types/api";

export const useForgotPasswordForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isPending, setIsPending] = useState(false);
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
    setIsPending(true);

    try {
      await forgotPasswordRequest(parsed.data);
      setIsSent(true);
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };

  return { errors, formError, isPending, isSent, submit };
};
