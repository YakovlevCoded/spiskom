import { useState } from "preact/hooks";

import { createTodoRequest } from "../../api/todos";
import type { CreateTodoInput } from "../../types/todo";

export const useCreateTodo = () => {
  const [isPending, setIsPending] = useState(false);

  const create = async (input: CreateTodoInput) => {
    setIsPending(true);

    try {
      return await createTodoRequest(input);
    } finally {
      setIsPending(false);
    }
  };

  return { create, isPending };
};
