import { LoaderCircle } from "lucide-preact";

import { useRegisterForm } from "@/hooks/auth/use-register-form";

import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { FormAlert } from "../ui/form-alert";
import { Input } from "../ui/input";
import { Link } from "../ui/link";
import { AuthCard } from "./auth-card";

export const RegisterForm = () => {
  const { errors, formError, isPending, submit } = useRegisterForm();

  return (
    <AuthCard
      title="Создайте аккаунт"
      subtitle="Один список, один пароль, минимум лишнего."
      footer={
        <p class="text-center text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
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

        <Field label="Пароль" htmlFor="password" error={errors.password}>
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
          Зарегистрироваться
        </Button>
      </form>
    </AuthCard>
  );
};
