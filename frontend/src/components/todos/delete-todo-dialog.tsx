import { LoaderCircle, Trash2 } from "lucide-preact";
import { useState } from "preact/hooks";

import { useDeleteTodo } from "@/hooks/todos/use-delete-todo";
import { getErrorMessage } from "@/lib/errors";
import type { Todo } from "@/types/todo";

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { FormAlert } from "../ui/form-alert";

interface DeleteTodoDialogProps {
  todo: Todo;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteTodoDialog = ({ todo, onClose, onDeleted }: DeleteTodoDialogProps) => {
  const { remove, isPending } = useDeleteTodo();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    try {
      await remove(todo.id);
      onDeleted();
      onClose();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      title="Удалить задачу?"
      description="Это действие нельзя отменить."
    >
      <div class="space-y-5">
        {error ? <FormAlert message={error} /> : null}
        <div class="rounded-2xl border border-destructive/15 bg-destructive/5 p-4">
          <p class="text-sm leading-6 text-muted-foreground">Задача</p>
          <p class="mt-1 font-bold break-words text-foreground">«{todo.title}»</p>
        </div>
        <div class="flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Отмена
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? <LoaderCircle class="animate-spin" size={16} /> : <Trash2 size={16} />}
            Удалить
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
