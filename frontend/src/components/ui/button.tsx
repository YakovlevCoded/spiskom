import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "preact";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-[color,background-color,border-color,box-shadow,transform] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        outline:
          "border border-border bg-card text-foreground shadow-sm hover:border-ring/40 hover:bg-secondary",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-lg px-3.5 text-sm",
        icon: "size-10 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

export const Button = ({
  class: className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) => (
  <button type={type} class={cn(buttonVariants({ variant, size }), className)} {...props} />
);

export { buttonVariants };
