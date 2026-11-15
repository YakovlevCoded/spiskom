import type { TodoListProps } from "@/types/todo-components";

import { TodoCard } from "./todo-card";

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
