import type { Todo } from "@/types/todo";

import { TodoCard } from "./todo-card";

interface TodoListProps {
  todos: Todo[];
  pendingId: string | null;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export const TodoList = ({ todos, pendingId, onToggle, onEdit, onDelete }: TodoListProps) => (
  <div class="space-y-3">
    {todos.map((todo) => (
      <TodoCard
        key={todo.id}
        todo={todo}
        isToggling={pendingId === todo.id}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);
