import { useCallback, useEffect, useState } from "preact/hooks";

import { listTodosRequest } from "../../api/todos";
import { getErrorMessage } from "../../lib/errors";
import type { Todo } from "../../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await listTodosRequest();
      setTodos(response.todos);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const replaceTodo = useCallback((updated: Todo) => {
    setTodos((current) => current.map((todo) => (todo.id === updated.id ? updated : todo)));
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { todos, isLoading, error, reload, replaceTodo };
};
