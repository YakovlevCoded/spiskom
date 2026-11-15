import { useState } from "preact/hooks";

import type { Todo } from "@/types/todo";

export const useTodoDialogs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);

  const openCreate = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);
  const closeDelete = () => setDeletingTodo(null);

  return {
    isFormOpen,
    editingTodo,
    deletingTodo,
    openCreate,
    openEdit,
    closeForm,
    setDeletingTodo,
    closeDelete,
  };
};
