import { z } from "zod";

const descriptionSchema = z
  .string()
  .trim()
  .max(2000, "Описание слишком длинное")
  .transform((value) => (value.length > 0 ? value : null));

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Введите заголовок")
    .max(120, "Заголовок должен быть не длиннее 120 символов"),
  description: descriptionSchema.optional(),
});

export const updateTodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Введите заголовок")
      .max(120, "Заголовок должен быть не длиннее 120 символов")
      .optional(),
    description: descriptionSchema.optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (value) =>
      value.title !== undefined || value.description !== undefined || value.completed !== undefined,
    {
      message: "Нужно передать заголовок, описание или статус",
    },
  );
