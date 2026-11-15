import { useState } from "preact/hooks";

import { resetPasswordRequest } from "../../api/auth";
import { getErrorMessage, getFieldErrors } from "../../lib/errors";
import { resetPasswordSchema } from "../../schemas/auth";
import type { FormErrors } from "../../types/api";

export const useResetPasswordForm = (token: string) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const submit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const parsed = resetPasswordSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setFormError("");
    setIsPending(true);

    try {
      await resetPasswordRequest({ token, password: parsed.data.password });
      setIsReset(true);
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };

  return { errors, formError, isPending, isReset, submit };
};
