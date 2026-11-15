import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  APP_URL: z.string().url(),
  WEB_ORIGIN: z.string().url(),
  COOKIE_SECURE: z.enum(["true", "false"]).optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(1025),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  MAIL_FROM: z.string().default("Списком <no-reply@spiskom.local>"),
  RESEND_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(parsed.error.issues);
  throw new Error("Некорректные переменные окружения");
}

export const env = {
  ...parsed.data,
  COOKIE_SECURE: parsed.data.COOKIE_SECURE
    ? parsed.data.COOKIE_SECURE === "true"
    : parsed.data.NODE_ENV === "production",
};
