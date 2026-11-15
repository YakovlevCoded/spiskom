import { useState } from "preact/hooks";

import { useAuth } from "@/hooks/use-auth";

export const useAppHeader = () => {
  const { user, logout } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);

    try {
      await logout();
    } finally {
      setIsPending(false);
    }
  };

  const initial = user?.email.slice(0, 1).toUpperCase() ?? "?";

  return { user, isPending, handleLogout, initial };
};
