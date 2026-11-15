import type { RequestHandler } from "express";

import { COOKIE_NAME, getUserIdFromToken } from "../lib/jwt";

export const requireAuth: RequestHandler = (request, response, next) => {
  const cookies = request.cookies as Record<string, string | undefined>;
  const cookieToken = cookies[COOKIE_NAME];
  const header = request.headers.authorization;
  const bearerToken = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  const token = cookieToken ?? bearerToken;

  if (!token) {
    response.status(401).json({ message: "Требуется авторизация" });
    return;
  }

  const userId = getUserIdFromToken(token);

  if (!userId) {
    response.status(401).json({ message: "Сессия истекла. Войдите снова" });
    return;
  }

  request.userId = userId;
  next();
};
