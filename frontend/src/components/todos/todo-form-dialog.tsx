import { LoaderCircle } from "lucide-preact";

import { useTodoForm } from "@/hooks/todos/use-todo-form";
import type { TodoFormDialogProps } from "@/types/todo-components";

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Field } from "../ui/field";
import { FormAlert } from "../ui/form-alert";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const TodoFormDialog = ({ todo, onClose, onSaved }: TodoFormDialogProps) => {
  const { errors, formError, isPending, submit } = useTodoForm(todo, () => {
    onSaved();
    onClose();
  });

  return (
    <Dialog
      open
      onClose={onClose}
      title={todo ? "Редактировать задачу" : "Новая задача"}
      description={
        todo
          ? "Обновите формулировку или детали."
          : "Запишите, что нужно сделать, пока мысль свежая."
      }
    >
      <form class="space-y-5" onSubmit={submit} noValidate>
        {formError ? <FormAlert message={formError} /> : null}

        <Field label="Заголовок" htmlFor="title" error={errors.title}>
          <Input
            id="title"
            name="title"
            defaultValue={todo?.title ?? ""}
            placeholder="Например, подготовить презентацию"
            maxLength={120}
            autoFocus
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
        </Field>

        <Field label="Описание" htmlFor="description" error={errors.description}>
          <Textarea
            id="description"
            name="description"
            defaultValue={todo?.description ?? ""}
            placeholder="Детали, ссылки, что учесть"
            maxLength={2000}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
        </Field>

        <div class="flex justify-end gap-2.5 pt-1">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderCircle class="animate-spin" size={16} /> : null}
            {todo ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
