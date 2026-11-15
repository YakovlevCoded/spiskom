import { createHash, randomBytes } from "node:crypto";

import { compare, hash } from "bcryptjs";

import { env } from "../../config/env";
import { resetPasswordEmail, welcomeEmail } from "../../lib/email-templates";
import { AppError } from "../../lib/errors";
import { sendMail } from "../../lib/mailer";
import { prisma } from "../../lib/prisma";
import type { LoginInput, PublicUser, RegisterInput } from "./auth.types";

const publicUserSelect = {
  id: true,
  email: true,
  createdAt: true,
} as const;

const toPublicUser = (user: PublicUser): PublicUser => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export const registerUser = async (input: RegisterInput): Promise<PublicUser> => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existing) {
    throw new AppError(409, "Пользователь с таким email уже существует");
  }

  const passwordHash = await hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
    },
    select: publicUserSelect,
  });

  try {
    await sendMail(welcomeEmail(user.email));
  } catch (error) {
    console.error("Не удалось отправить приветственное письмо", error);
  }

  return toPublicUser(user);
};

export const loginUser = async (input: LoginInput): Promise<PublicUser> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user || !(await compare(input.password, user.passwordHash))) {
    throw new AppError(401, "Неверный email или пароль");
  }

  return toPublicUser(user);
};

export const getUserById = async (userId: string): Promise<PublicUser | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: publicUserSelect,
  });

  return user ? toPublicUser(user) : null;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });

  if (!user) {
    return;
  }

  const token = randomBytes(32).toString("hex");
  const link = `${env.APP_URL}/reset-password?token=${token}`;

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
    prisma.passwordResetToken.create({
      data: {
        tokenHash: hashToken(token),
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    }),
  ]);

  try {
    await sendMail(resetPasswordEmail(user.email, link));
  } catch (error) {
    console.error("Не удалось отправить письмо для сброса пароля", error);
    throw new AppError(502, "Не удалось отправить письмо. Попробуйте позже");
  }
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { select: { id: true } } },
  });

  if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
    throw new AppError(400, "Ссылка недействительна или уже истекла");
  }

  const passwordHash = await hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.user.id },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    prisma.passwordResetToken.deleteMany({
      where: {
        userId: record.user.id,
        id: { not: record.id },
      },
    }),
  ]);
};
