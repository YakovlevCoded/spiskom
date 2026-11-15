import { useState } from "preact/hooks";

import { getErrorMessage, getFieldErrors } from "../../lib/errors";
import { todoSchema } from "../../schemas/todo";
import type { FormErrors } from "../../types/api";
import type { Todo } from "../../types/todo";
import { useCreateTodo } from "./use-create-todo";
import { useUpdateTodo } from "./use-update-todo";

export const useTodoForm = (todo: Todo | null, onSuccess: () => void) => {
  const { create, isPending: isCreating } = useCreateTodo();
  const { update, isPending: isUpdating } = useUpdateTodo();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");

  const submit = async (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const parsed = todoSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setFormError("");

    try {
      if (todo) {
        await update(todo.id, parsed.data);
      } else {
        await create(parsed.data);
      }

      onSuccess();
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  return { errors, formError, isPending: isCreating || isUpdating, submit };
};
