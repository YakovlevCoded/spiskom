import type { Request } from "express";
import { Router } from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";

import { clearAuthCookie, setAuthCookie } from "../../lib/jwt";
import { requireAuth } from "../../middleware/auth";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.schemas";
import {
  getUserById,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from "./auth.service";

const getClientKey = (request: Request) => {
  const header = request.headers["x-nf-client-connection-ip"] ?? request.headers["x-forwarded-for"];
  const forwarded = Array.isArray(header) ? header[0] : header;
  const ip = request.ip ?? forwarded?.split(",")[0]?.trim() ?? "serverless";

  return ipKeyGenerator(ip);
};

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: getClientKey,
  validate: { ip: false },
  handler: (_request, response) => {
    response.status(429).json({
      message: "Слишком много попыток. Попробуйте позже",
    });
  },
});

export const authRouter = Router();

authRouter.post("/register", authLimiter, async (request, response) => {
  const input = registerSchema.parse(request.body);
  const user = await registerUser(input);

  setAuthCookie(response, user.id);
  response.status(201).json({ user });
});

authRouter.post("/login", authLimiter, async (request, response) => {
  const input = loginSchema.parse(request.body);
  const user = await loginUser(input);

  setAuthCookie(response, user.id);
  response.json({ user });
});

authRouter.post("/logout", (_request, response) => {
  clearAuthCookie(response);
  response.status(204).end();
});

authRouter.get("/me", requireAuth, async (request, response) => {
  const user = await getUserById(request.userId!);

  if (!user) {
    clearAuthCookie(response);
    response.status(401).json({ message: "Пользователь не найден" });
    return;
  }

  response.json({ user });
});

authRouter.post("/forgot-password", authLimiter, async (request, response) => {
  const input = forgotPasswordSchema.parse(request.body);

  await requestPasswordReset(input.email);
  response.status(204).end();
});

authRouter.post("/reset-password", authLimiter, async (request, response) => {
  const input = resetPasswordSchema.parse(request.body);

  await resetPassword(input.token, input.password);
  response.status(204).end();
});
