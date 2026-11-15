import { useState } from "preact/hooks";

import { useResetPassword } from "@/hooks/auth/use-reset-password";
import { getErrorMessage, getFieldErrors } from "@/lib/errors";
import { resetPasswordSchema } from "@/schemas/auth";
import type { FormErrors } from "@/types/api";

export const useResetPasswordForm = (token: string) => {
  const { reset, isPending } = useResetPassword();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
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

    try {
      await reset(token, parsed.data.password);
      setIsReset(true);
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  return { errors, formError, isPending, isReset, submit };
};
