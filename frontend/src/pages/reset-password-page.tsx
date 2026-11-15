import { useLocation } from "preact-iso";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthLayout } from "@/components/layout/auth-layout";

export const ResetPasswordPage = () => {
  const { query } = useLocation();
  const token = typeof query.token === "string" ? query.token : "";

  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};
