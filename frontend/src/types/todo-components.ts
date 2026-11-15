import type { Todo } from "./todo";

export interface TodoCardProps {
  todo: Todo;
  isToggling: boolean;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export interface TodoListProps {
  todos: Todo[];
  pendingId: string | null;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export interface TodoFormDialogProps {
  todo: Todo | null;
  onClose: () => void;
  onSaved: () => void;
}

export interface DeleteTodoDialogProps {
  todo: Todo;
  onClose: () => void;
  onDeleted: () => void;
}

export interface EmptyStateProps {
  onCreate: () => void;
}
