import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

import { AppError } from "../lib/errors";

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json({ message: "Маршрут не найден" });
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.status).json({
      message: error.message,
      fields: error.fields,
    });
    return;
  }

  if (error instanceof ZodError) {
    const fields = Object.fromEntries(
      error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
    );

    response.status(400).json({
      message: error.issues[0]?.message ?? "Проверьте данные",
      fields,
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      response.status(409).json({ message: "Такая запись уже существует" });
      return;
    }

    if (error.code === "P2025") {
      response.status(404).json({ message: "Запись не найдена" });
      return;
    }
  }

  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({ message: "Некорректный JSON в запросе" });
    return;
  }

  console.error(error);
  response.status(500).json({ message: "Внутренняя ошибка сервера" });
};
