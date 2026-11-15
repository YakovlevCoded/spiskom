import type { z } from "zod";

import type { createTodoSchema, updateTodoSchema } from "./todos.schemas";

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export interface TodoDto {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
}
