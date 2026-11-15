import type { TodoInput, TodoResponse, TodosResponse } from "../types/todo";
import { apiRequest } from "./client";

export const listTodosRequest = () => apiRequest<TodosResponse>("/api/todos");

export const createTodoRequest = (input: TodoInput) =>
  apiRequest<TodoResponse>("/api/todos", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const updateTodoRequest = (id: string, input: TodoInput) =>
  apiRequest<TodoResponse>(`/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });

export const deleteTodoRequest = (id: string) =>
  apiRequest<void>(`/api/todos/${id}`, {
    method: "DELETE",
  });
