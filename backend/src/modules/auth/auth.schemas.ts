import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Введите email")
  .email("Введите корректный email")
  .transform((value) => value.toLowerCase());

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Введите пароль").max(72, "Пароль слишком длинный"),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(72, "Пароль слишком длинный"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Ссылка недействительна"),
  password: z
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(72, "Пароль слишком длинный"),
});
