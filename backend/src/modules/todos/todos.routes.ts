import { Router } from "express";

import { AppError } from "../../lib/errors";
import { requireAuth } from "../../middleware/auth";
import { createTodoSchema, updateTodoSchema } from "./todos.schemas";
import { createTodo, deleteTodo, listTodos, updateTodo } from "./todos.service";

export const todosRouter = Router();

todosRouter.use(requireAuth);

todosRouter.get("/", async (request, response) => {
  const todos = await listTodos(request.userId!);

  response.json({ todos });
});

todosRouter.post("/", async (request, response) => {
  const input = createTodoSchema.parse(request.body);
  const todo = await createTodo(request.userId!, input);

  response.status(201).json({ todo });
});

todosRouter.patch("/:id", async (request, response) => {
  const { id } = request.params;

  if (!id) {
    throw new AppError(400, "Не указан идентификатор задачи");
  }

  const input = updateTodoSchema.parse(request.body);
  const todo = await updateTodo(request.userId!, id, input);

  response.json({ todo });
});

todosRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  if (!id) {
    throw new AppError(400, "Не указан идентификатор задачи");
  }

  await deleteTodo(request.userId!, id);
  response.status(204).end();
});
