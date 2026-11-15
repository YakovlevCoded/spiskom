import { LoaderCircle, MailCheck } from "lucide-preact";

import { useForgotPasswordForm } from "@/hooks/auth/use-forgot-password-form";

import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { FormAlert } from "../ui/form-alert";
import { Input } from "../ui/input";
import { Link } from "../ui/link";
import { AuthCard } from "./auth-card";

export const ForgotPasswordForm = () => {
  const { errors, formError, isPending, isSent, submit } = useForgotPasswordForm();

  if (isSent) {
    return (
      <AuthCard
        title="Проверьте почту"
        subtitle="Если такой аккаунт существует, мы отправили ссылку для сброса пароля."
        footer={
          <p class="text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              class="font-bold text-foreground underline-offset-4 hover:underline"
            >
              Вернуться ко входу
            </Link>
          </p>
        }
      >
        <div class="flex items-center gap-4 rounded-2xl border border-primary/15 bg-accent/60 p-4">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MailCheck size={20} />
          </span>
          <p class="text-sm leading-6 text-accent-foreground">
            Ссылка действует один час. Проверьте папку «Спам», если письма нет.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Восстановление пароля"
      subtitle="Укажите email — отправим ссылку для создания нового пароля."
      footer={
        <p class="text-center text-sm text-muted-foreground">
          Вспомнили пароль?{" "}
          <Link href="/login" class="font-bold text-foreground underline-offset-4 hover:underline">
            Войти
          </Link>
        </p>
      }
    >
      <form class="space-y-5" onSubmit={submit} noValidate>
        {formError ? <FormAlert message={formError} /> : null}

        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <Button type="submit" class="mt-2 w-full" disabled={isPending}>
          {isPending ? <LoaderCircle class="animate-spin" size={17} /> : null}
          Отправить ссылку
        </Button>
      </form>
    </AuthCard>
  );
};
