import { AlertCircle, Plus, RefreshCw } from "lucide-preact";
import { useState } from "preact/hooks";

import { AppHeader } from "@/components/layout/app-header";
import { DeleteTodoDialog } from "@/components/todos/delete-todo-dialog";
import { EmptyState } from "@/components/todos/empty-state";
import { TodoFormDialog } from "@/components/todos/todo-form-dialog";
import { TodoList } from "@/components/todos/todo-list";
import { TodosSkeleton } from "@/components/todos/todos-skeleton";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/hooks/todos/use-todos";
import { useToggleTodo } from "@/hooks/todos/use-toggle-todo";
import { tasksCountLabel } from "@/lib/utils";
import type { Todo } from "@/types/todo";

export const TodosPage = () => {
  const { todos, isLoading, error, reload, replaceTodo } = useTodos();
  const { toggle, pendingId } = useToggleTodo();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const completedCount = todos.filter((todo) => todo.completed).length;

  const openCreate = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleSaved = () => {
    void reload();
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await toggle(todo);
      replaceTodo(updated);
    } catch {
      void reload();
    }
  };

  return (
    <div class="min-h-screen">
      <AppHeader />

      <main class="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <section class="relative mt-8 overflow-hidden rounded-[2rem] border border-border/80 bg-card/85 p-6 shadow-[0_24px_70px_-50px_rgba(40,45,35,0.5)] backdrop-blur sm:p-8">
          <div class="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-accent/70 blur-3xl" />
          <div class="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div class="max-w-2xl">
              <p class="text-[11px] font-extrabold tracking-[0.18em] text-muted-foreground uppercase">
                Личное пространство
              </p>
              <h1 class="mt-3 text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">
                Мои задачи
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Короткий список того, что важно. Добавляйте, правьте и держите под рукой.
              </p>
            </div>
            <Button class="shrink-0" onClick={openCreate}>
              <Plus size={17} />
              Новая задача
            </Button>
          </div>
        </section>

        <div class="mt-8 mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-lg font-extrabold tracking-[-0.025em]">Последние задачи</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              {tasksCountLabel(todos.length)} · выполнено: {completedCount}
            </p>
          </div>
        </div>

        {isLoading ? <TodosSkeleton /> : null}

        {!isLoading && error ? (
          <div class="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <AlertCircle class="mx-auto text-destructive" size={26} />
            <p class="mt-3 font-bold text-foreground">Не удалось загрузить задачи</p>
            <p class="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" class="mt-5" onClick={reload}>
              <RefreshCw size={16} />
              Попробовать снова
            </Button>
          </div>
        ) : null}

        {!isLoading && !error && todos.length === 0 ? <EmptyState onCreate={openCreate} /> : null}

        {!isLoading && !error && todos.length > 0 ? (
          <TodoList
            todos={todos}
            pendingId={pendingId}
            onToggle={handleToggle}
            onEdit={openEdit}
            onDelete={setDeletingTodo}
          />
        ) : null}

        <footer class="mt-14 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>Списком — задачи без лишнего</span>
          <span>Ваши записи видны только вам</span>
        </footer>
      </main>

      {isFormOpen ? (
        <TodoFormDialog
          key={editingTodo?.id ?? "new"}
          todo={editingTodo}
          onClose={() => setIsFormOpen(false)}
          onSaved={handleSaved}
        />
      ) : null}

      {deletingTodo ? (
        <DeleteTodoDialog
          todo={deletingTodo}
          onClose={() => setDeletingTodo(null)}
          onDeleted={handleSaved}
        />
      ) : null}
    </div>
  );
};
