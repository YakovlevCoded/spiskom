import { LoaderCircle, Trash2 } from "lucide-preact";

import type { DeleteTodoDialogProps } from "@/types/todo-components";

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { FormAlert } from "../ui/form-alert";
import { useDeleteTodoDialog } from "./use-delete-todo-dialog";

export const DeleteTodoDialog = ({ todo, onClose, onDeleted }: DeleteTodoDialogProps) => {
  const { error, isPending, handleDelete } = useDeleteTodoDialog(onDeleted, onClose);

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
          <Button variant="destructive" onClick={() => handleDelete(todo.id)} disabled={isPending}>
            {isPending ? <LoaderCircle class="animate-spin" size={16} /> : <Trash2 size={16} />}
            Удалить
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
