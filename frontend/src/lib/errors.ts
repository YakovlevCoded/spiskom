import type { ZodError } from "zod";

import { ApiError } from "../api/client";
import type { FormErrors } from "../types/api";

export const getFieldErrors = (error: ZodError): FormErrors =>
  error.issues.reduce<FormErrors>((result, issue) => {
    const field = String(issue.path[0] ?? "form");

    if (!result[field]) {
      result[field] = issue.message;
    }

    return result;
  }, {});

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof TypeError) {
    return "Не удалось связаться с сервером. Проверьте подключение";
  }

  return "Что-то пошло не так. Попробуйте ещё раз";
};
