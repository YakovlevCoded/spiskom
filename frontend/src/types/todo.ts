export interface Todo {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface TodoInput {
  title: string;
  description: string;
}

export interface TodosResponse {
  todos: Todo[];
}

export interface TodoResponse {
  todo: Todo;
}
