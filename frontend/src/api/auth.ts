import type {
  AuthResponse,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "../types/auth";
import { apiRequest } from "./client";

export const loginRequest = (input: LoginInput) =>
  apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const registerRequest = (input: RegisterInput) =>
  apiRequest<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const logoutRequest = () =>
  apiRequest<void>("/api/auth/logout", {
    method: "POST",
  });

export const meRequest = () => apiRequest<AuthResponse>("/api/auth/me");

export const forgotPasswordRequest = (input: ForgotPasswordInput) =>
  apiRequest<void>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const resetPasswordRequest = (input: ResetPasswordInput) =>
  apiRequest<void>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(input),
  });
