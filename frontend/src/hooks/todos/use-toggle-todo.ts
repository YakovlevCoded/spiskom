import { useState } from "preact/hooks";

import { updateTodoRequest } from "../../api/todos";
import type { Todo } from "../../types/todo";

export const useToggleTodo = () => {
  const [pendingId, setPendingId] = useState<string | null>(null);

  const toggle = async (todo: Todo) => {
    setPendingId(todo.id);

    try {
      const response = await updateTodoRequest(todo.id, { completed: !todo.completed });
      return response.todo;
    } finally {
      setPendingId(null);
    }
  };

  return { toggle, pendingId };
};
