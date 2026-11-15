import { useToggleTodo } from "@/hooks/todos/use-toggle-todo";
import type { Todo } from "@/types/todo";

export const useTodoToggle = (onUpdated: (todo: Todo) => void, onError: () => void) => {
  const { toggle, pendingId } = useToggleTodo();

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await toggle(todo);
      onUpdated(updated);
    } catch {
      onError();
    }
  };

  return { handleToggle, pendingId };
};
