import { useState } from "preact/hooks";

import { forgotPasswordRequest } from "../../api/auth";

export const useForgotPassword = () => {
  const [isPending, setIsPending] = useState(false);

  const request = async (email: string) => {
    setIsPending(true);

    try {
      await forgotPasswordRequest({ email });
    } finally {
      setIsPending(false);
    }
  };

  return { request, isPending };
};
