import { z } from "zod";

const emailSchema = z.string().trim().min(1, "Введите email").email("Введите корректный email");

const newPasswordSchema = z
  .string()
  .min(8, "Пароль должен содержать минимум 8 символов")
  .max(72, "Пароль слишком длинный");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Введите пароль"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, "Повторите пароль"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, "Повторите пароль"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
