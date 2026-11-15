import { LoaderCircle } from "lucide-preact";

import { useLoginForm } from "@/hooks/auth/use-login-form";

import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { FormAlert } from "../ui/form-alert";
import { Input } from "../ui/input";
import { Link } from "../ui/link";
import { AuthCard } from "./auth-card";

export const LoginForm = () => {
  const { errors, formError, isPending, submit } = useLoginForm();

  return (
    <AuthCard
      title="С возвращением"
      subtitle="Войдите, чтобы вернуться к своему списку."
      footer={
        <p class="text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            class="font-bold text-foreground underline-offset-4 hover:underline"
          >
            Зарегистрироваться
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

        <Field
          label="Пароль"
          htmlFor="password"
          error={errors.password}
          hint={
            <Link
              href="/forgot-password"
              class="text-xs font-bold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Забыли пароль?
            </Link>
          }
        >
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Ваш пароль"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </Field>

        <Button type="submit" class="mt-2 w-full" disabled={isPending}>
          {isPending ? <LoaderCircle class="animate-spin" size={17} /> : null}
          Войти
        </Button>
      </form>
    </AuthCard>
  );
};
