import { useState } from "preact/hooks";

import { updateTodoRequest } from "../../api/todos";
import type { UpdateTodoInput } from "../../types/todo";

export const useUpdateTodo = () => {
  const [isPending, setIsPending] = useState(false);

  const update = async (id: string, input: UpdateTodoInput) => {
    setIsPending(true);

    try {
      return await updateTodoRequest(id, input);
    } finally {
      setIsPending(false);
    }
  };

  return { update, isPending };
};
