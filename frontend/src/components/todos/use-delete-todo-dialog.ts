import { useState } from "preact/hooks";

import { useDeleteTodo } from "@/hooks/todos/use-delete-todo";
import { getErrorMessage } from "@/lib/errors";

export const useDeleteTodoDialog = (onDeleted: () => void, onClose: () => void) => {
  const { remove, isPending } = useDeleteTodo();
  const [error, setError] = useState("");

  const handleDelete = async (todoId: string) => {
    setError("");

    try {
      await remove(todoId);
      onDeleted();
      onClose();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    }
  };

  return { error, isPending, handleDelete };
};
