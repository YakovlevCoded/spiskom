import { useState } from "preact/hooks";

import { getErrorMessage, getFieldErrors } from "../../lib/errors";
import { registerSchema } from "../../schemas/auth";
import type { FormErrors } from "../../types/api";
import { useAuth } from "../use-auth";

export const useRegisterForm = () => {
  const { register } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const submit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const parsed = registerSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setFormError("");
    setIsPending(true);

    try {
      await register({ email: parsed.data.email, password: parsed.data.password });
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };

  return { errors, formError, isPending, submit };
};
