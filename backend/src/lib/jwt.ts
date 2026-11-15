import type { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";

const COOKIE_NAME = "spiskom_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.COOKIE_SECURE,
  path: "/",
  maxAge: SESSION_TTL_MS,
};

export const setAuthCookie = (response: Response, userId: string) => {
  const token = jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    expiresIn: "7d",
  });

  response.cookie(COOKIE_NAME, token, cookieOptions);
};

export const clearAuthCookie = (response: Response) => {
  response.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.COOKIE_SECURE,
    path: "/",
  });
};

export const getUserIdFromToken = (token: string) => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload === "object" && typeof payload.sub === "string") {
      return payload.sub;
    }

    return null;
  } catch {
    return null;
  }
};

export const getTokenFromCookieHeader = (cookieHeader: string | undefined, name: string) => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const cookie = cookies.find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
};

export { COOKIE_NAME };
