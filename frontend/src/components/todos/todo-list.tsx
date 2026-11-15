import type { Todo } from "@/types/todo";

import { TodoCard } from "./todo-card";

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export const TodoList = ({ todos, onEdit, onDelete }: TodoListProps) => (
  <div class="space-y-3">
    {todos.map((todo) => (
      <TodoCard key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);
