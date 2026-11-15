import type { AuthCardProps } from "@/types/layout";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => (
  <Card class="rounded-[1.75rem] border-border/90 bg-card/95 p-6 shadow-[0_24px_70px_-40px_rgba(40,45,35,0.35)] backdrop-blur sm:p-8">
    <CardHeader class="mb-7 space-y-2 p-0">
      <CardTitle class="text-3xl font-extrabold tracking-[-0.045em]">{title}</CardTitle>
      <CardDescription class="text-sm leading-6">{subtitle}</CardDescription>
    </CardHeader>
    <CardContent class="p-0">{children}</CardContent>
    {footer ? (
      <CardFooter class="mt-7 block border-t border-border/70 p-0 pt-6">{footer}</CardFooter>
    ) : null}
  </Card>
);
