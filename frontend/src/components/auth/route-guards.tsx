import type { AuthRouteProps } from "@/types/auth-components";

import { PageLoader } from "../layout/page-loader";
import { useRouteGuard } from "./use-route-guard";

export const ProtectedRoute = ({ children }: AuthRouteProps) => {
  const { user, isLoading } = useRouteGuard("protected");

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export const GuestRoute = ({ children }: AuthRouteProps) => {
  const { user, isLoading } = useRouteGuard("guest");

  if (isLoading) {
    return <PageLoader />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
};
