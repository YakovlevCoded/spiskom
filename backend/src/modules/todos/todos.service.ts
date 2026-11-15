import { AppError } from "../../lib/errors";
import { prisma } from "../../lib/prisma";
import type { CreateTodoInput, TodoDto, UpdateTodoInput } from "./todos.types";

const todoSelect = {
  id: true,
  title: true,
  description: true,
  createdAt: true,
} as const;

export const listTodos = async (userId: string): Promise<TodoDto[]> =>
  prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: todoSelect,
  });

export const createTodo = async (userId: string, input: CreateTodoInput): Promise<TodoDto> =>
  prisma.todo.create({
    data: {
      userId,
      title: input.title,
      description: input.description ?? null,
    },
    select: todoSelect,
  });

export const updateTodo = async (
  userId: string,
  todoId: string,
  input: UpdateTodoInput,
): Promise<TodoDto> => {
  const existing = await prisma.todo.findFirst({
    where: { id: todoId, userId },
    select: { id: true },
  });

  if (!existing) {
    throw new AppError(404, "Задача не найдена");
  }

  return prisma.todo.update({
    where: { id: todoId },
    data: {
      title: input.title,
      description: input.description,
    },
    select: todoSelect,
  });
};

export const deleteTodo = async (userId: string, todoId: string): Promise<void> => {
  const result = await prisma.todo.deleteMany({
    where: { id: todoId, userId },
  });

  if (result.count === 0) {
    throw new AppError(404, "Задача не найдена");
  }
};
