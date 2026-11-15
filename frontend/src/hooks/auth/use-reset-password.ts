import { useState } from "preact/hooks";

import { resetPasswordRequest } from "../../api/auth";

export const useResetPassword = () => {
  const [isPending, setIsPending] = useState(false);

  const reset = async (token: string, password: string) => {
    setIsPending(true);

    try {
      await resetPasswordRequest({ token, password });
    } finally {
      setIsPending(false);
    }
  };

  return { reset, isPending };
};
