import type { ComponentChildren } from "preact";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ComponentChildren;
  footer?: ComponentChildren;
}

export const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => (
  <section class="rounded-[1.75rem] border border-border/90 bg-card/95 p-6 shadow-[0_24px_70px_-40px_rgba(40,45,35,0.35)] backdrop-blur sm:p-8">
    <div class="mb-7 space-y-2">
      <h1 class="text-3xl font-extrabold tracking-[-0.045em]">{title}</h1>
      <p class="text-sm leading-6 text-muted-foreground">{subtitle}</p>
    </div>
    {children}
    {footer ? <div class="mt-7 border-t border-border/70 pt-6">{footer}</div> : null}
  </section>
);
