import type { CreateTodoInput, TodoResponse, TodosResponse, UpdateTodoInput } from "../types/todo";
import { apiRequest } from "./client";

export const listTodosRequest = () => apiRequest<TodosResponse>("/api/todos");

export const createTodoRequest = (input: CreateTodoInput) =>
  apiRequest<TodoResponse>("/api/todos", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const updateTodoRequest = (id: string, input: UpdateTodoInput) =>
  apiRequest<TodoResponse>(`/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });

export const deleteTodoRequest = (id: string) =>
  apiRequest<void>(`/api/todos/${id}`, {
    method: "DELETE",
  });
