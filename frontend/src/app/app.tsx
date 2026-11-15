import type { ComponentChildren } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";

import { GuestRoute, ProtectedRoute } from "@/components/auth/route-guards";
import { AuthProvider } from "@/context/auth-context";
import { ForgotPasswordPage } from "@/pages/forgot-password-page";
import { LoginPage } from "@/pages/login-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { RegisterPage } from "@/pages/register-page";
import { ResetPasswordPage } from "@/pages/reset-password-page";
import { TodosPage } from "@/pages/todos-page";

const protectedPage = (children: ComponentChildren) => () => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const guestPage = (children: ComponentChildren) => () => <GuestRoute>{children}</GuestRoute>;

const ProtectedTodosPage = protectedPage(<TodosPage />);
const GuestLoginPage = guestPage(<LoginPage />);
const GuestRegisterPage = guestPage(<RegisterPage />);
const GuestForgotPasswordPage = guestPage(<ForgotPasswordPage />);

export const App = () => (
  <AuthProvider>
    <LocationProvider>
      <Router>
        <Route path="/" component={ProtectedTodosPage} />
        <Route path="/login" component={GuestLoginPage} />
        <Route path="/register" component={GuestRegisterPage} />
        <Route path="/forgot-password" component={GuestForgotPasswordPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        <Route default component={NotFoundPage} />
      </Router>
    </LocationProvider>
  </AuthProvider>
);
