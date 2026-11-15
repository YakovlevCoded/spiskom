import { useState } from "preact/hooks";

import { getErrorMessage, getFieldErrors } from "../../lib/errors";
import { loginSchema } from "../../schemas/auth";
import type { FormErrors } from "../../types/api";
import { useAuth } from "../use-auth";

export const useLoginForm = () => {
  const { login } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const submit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const parsed = loginSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setFormError("");
    setIsPending(true);

    try {
      await login(parsed.data);
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };

  return { errors, formError, isPending, submit };
};
