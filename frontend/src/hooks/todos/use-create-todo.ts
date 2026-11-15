import { useState } from "preact/hooks";

import { createTodoRequest } from "../../api/todos";
import type { TodoInput } from "../../types/todo";

export const useCreateTodo = () => {
  const [isPending, setIsPending] = useState(false);

  const create = async (input: TodoInput) => {
    setIsPending(true);

    try {
      return await createTodoRequest(input);
    } finally {
      setIsPending(false);
    }
  };

  return { create, isPending };
};
