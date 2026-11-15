import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Введите заголовок")
    .max(120, "Заголовок должен быть не длиннее 120 символов"),
  description: z.string().trim().max(2000, "Описание слишком длинное"),
});
