import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";

import { useAuth } from "@/hooks/use-auth";

import { PageLoader } from "../layout/page-loader";

export const ProtectedRoute = ({ children }: { children: ComponentChildren }) => {
  const { user, isLoading } = useAuth();
  const { route } = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      route("/login", true);
    }
  }, [isLoading, user, route]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export const GuestRoute = ({ children }: { children: ComponentChildren }) => {
  const { user, isLoading } = useAuth();
  const { route } = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      route("/", true);
    }
  }, [isLoading, user, route]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
};
