import { CheckCircle2, LoaderCircle } from "lucide-preact";

import type { ResetPasswordFormProps } from "@/types/auth";

import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { FormAlert } from "../ui/form-alert";
import { Input } from "../ui/input";
import { Link } from "../ui/link";
import { AuthCard } from "./auth-card";
import { useResetPasswordForm } from "./use-reset-password-form";

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { errors, formError, isPending, isReset, submit } = useResetPasswordForm(token);

  if (!token) {
    return (
      <AuthCard
        title="Ссылка недействительна"
        subtitle="В ссылке для сброса пароля нет токена. Запросите новое письмо."
        footer={
          <p class="text-center text-sm text-muted-foreground">
            <Link
              href="/forgot-password"
              class="font-bold text-foreground underline-offset-4 hover:underline"
            >
              Запросить новую ссылку
            </Link>
          </p>
        }
      >
        <div class="rounded-2xl border border-destructive/15 bg-destructive/5 p-4 text-sm leading-6 text-muted-foreground">
          Ссылка могла быть скопирована не полностью.
        </div>
      </AuthCard>
    );
  }

  if (isReset) {
    return (
      <AuthCard
        title="Пароль обновлён"
        subtitle="Теперь можно войти с новым паролем."
        footer={
          <p class="text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              class="font-bold text-foreground underline-offset-4 hover:underline"
            >
              Перейти ко входу
            </Link>
          </p>
        }
      >
        <div class="flex items-center gap-4 rounded-2xl border border-primary/15 bg-accent/60 p-4">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 size={20} />
          </span>
          <p class="text-sm leading-6 text-accent-foreground">
            Ссылка больше не действует. Если нужно, запросите новую.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Новый пароль"
      subtitle="Придумайте пароль, который не используете в других сервисах."
      footer={
        <p class="text-center text-sm text-muted-foreground">
          <Link href="/login" class="font-bold text-foreground underline-offset-4 hover:underline">
            Вернуться ко входу
          </Link>
        </p>
      }
    >
      <form class="space-y-5" onSubmit={submit} noValidate>
        {formError ? <FormAlert message={formError} /> : null}

        <Field label="Новый пароль" htmlFor="password" error={errors.password}>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Минимум 8 символов"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </Field>

        <Field label="Повторите пароль" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Ещё раз"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
          />
        </Field>

        <Button type="submit" class="mt-2 w-full" disabled={isPending}>
          {isPending ? <LoaderCircle class="animate-spin" size={17} /> : null}
          Сохранить пароль
        </Button>
      </form>
    </AuthCard>
  );
};
