import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";

import { useAuth } from "@/hooks/use-auth";

export const useRouteGuard = (mode: "protected" | "guest") => {
  const { user, isLoading } = useAuth();
  const { route } = useLocation();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (mode === "protected" && !user) {
      route("/login", true);
    }

    if (mode === "guest" && user) {
      route("/", true);
    }
  }, [isLoading, mode, route, user]);

  return { user, isLoading };
};
