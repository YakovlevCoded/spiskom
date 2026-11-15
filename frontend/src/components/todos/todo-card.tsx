import { CalendarDays, Pencil, Trash2 } from "lucide-preact";

import { formatCreatedAt } from "@/lib/utils";
import type { Todo } from "@/types/todo";

import { Button } from "../ui/button";

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export const TodoCard = ({ todo, onEdit, onDelete }: TodoCardProps) => (
  <article class="group rounded-2xl border border-border/85 bg-card p-5 shadow-[0_16px_36px_-30px_rgba(40,45,35,0.4)] transition hover:-translate-y-0.5 hover:border-ring/25 hover:shadow-[0_22px_45px_-30px_rgba(40,45,35,0.45)] sm:p-6">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 flex-1">
        <h3 class="text-lg font-extrabold tracking-[-0.025em] text-balance break-words">
          {todo.title}
        </h3>
        {todo.description ? (
          <p class="mt-2 line-clamp-3 text-sm leading-6 whitespace-pre-line text-muted-foreground">
            {todo.description}
          </p>
        ) : null}
      </div>

      <div class="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Редактировать задачу «${todo.title}»`}
          onClick={() => onEdit(todo)}
        >
          <Pencil size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          class="hover:text-destructive"
          aria-label={`Удалить задачу «${todo.title}»`}
          onClick={() => onDelete(todo)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-1.5 border-t border-border/60 pt-4 text-xs font-semibold text-muted-foreground/80">
      <CalendarDays size={13} />
      Создано {formatCreatedAt(todo.createdAt)}
    </div>
  </article>
);
