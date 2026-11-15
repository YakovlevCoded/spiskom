import { cn } from "@/lib/utils";
import type { CardDescriptionProps, CardProps, CardTitleProps } from "@/types/ui";

export const Card = ({ class: className, ...props }: CardProps) => (
  <div
    class={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
);

export const CardHeader = ({ class: className, ...props }: CardProps) => (
  <div class={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
);

export const CardTitle = ({ class: className, ...props }: CardTitleProps) => (
  <h3 class={cn("leading-none font-semibold tracking-tight", className)} {...props} />
);

export const CardDescription = ({ class: className, ...props }: CardDescriptionProps) => (
  <p class={cn("text-sm text-muted-foreground", className)} {...props} />
);

export const CardContent = ({ class: className, ...props }: CardProps) => (
  <div class={cn("p-6 pt-0", className)} {...props} />
);

export const CardFooter = ({ class: className, ...props }: CardProps) => (
  <div class={cn("flex items-center p-6 pt-0", className)} {...props} />
);
