import { useState } from "preact/hooks";

import { deleteTodoRequest } from "../../api/todos";

export const useDeleteTodo = () => {
  const [isPending, setIsPending] = useState(false);

  const remove = async (id: string) => {
    setIsPending(true);

    try {
      await deleteTodoRequest(id);
    } finally {
      setIsPending(false);
    }
  };

  return { remove, isPending };
};
