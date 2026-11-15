import { CalendarDays, Check, LoaderCircle, Pencil, Trash2 } from "lucide-preact";

import { cn, formatCreatedAt } from "@/lib/utils";
import type { Todo } from "@/types/todo";

import { Button } from "../ui/button";

interface TodoCardProps {
  todo: Todo;
  isToggling: boolean;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export const TodoCard = ({ todo, isToggling, onToggle, onEdit, onDelete }: TodoCardProps) => (
  <article
    class={cn(
      "group rounded-2xl border border-border/85 bg-card p-5 shadow-[0_16px_36px_-30px_rgba(40,45,35,0.4)] transition hover:-translate-y-0.5 hover:border-ring/25 hover:shadow-[0_22px_45px_-30px_rgba(40,45,35,0.45)] sm:p-6",
      todo.completed && "bg-muted/55 hover:border-border",
    )}
  >
    <div class="flex items-start gap-3.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={
          todo.completed
            ? `Вернуть задачу «${todo.title}» в работу`
            : `Отметить задачу «${todo.title}» выполненной`
        }
        disabled={isToggling}
        onClick={() => onToggle(todo)}
        class={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60",
          todo.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-transparent hover:border-ring",
        )}
      >
        {isToggling ? (
          <LoaderCircle class="animate-spin text-muted-foreground" size={13} />
        ) : (
          <Check size={14} strokeWidth={3} />
        )}
      </button>

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-4">
          <h3
            class={cn(
              "text-lg font-extrabold tracking-[-0.025em] text-balance break-words transition",
              todo.completed && "text-muted-foreground line-through decoration-1",
            )}
          >
            {todo.title}
          </h3>

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

        {todo.description ? (
          <p
            class={cn(
              "mt-2 line-clamp-3 text-sm leading-6 whitespace-pre-line text-muted-foreground transition",
              todo.completed && "line-through decoration-1 opacity-65",
            )}
          >
            {todo.description}
          </p>
        ) : null}

        <div class="mt-4 flex items-center gap-1.5 border-t border-border/60 pt-4 text-xs font-semibold text-muted-foreground/80">
          <CalendarDays size={13} />
          Создано {formatCreatedAt(todo.createdAt)}
        </div>
      </div>
    </div>
  </article>
);
