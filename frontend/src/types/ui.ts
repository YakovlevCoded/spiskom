import type { ComponentChildren, ComponentProps } from "preact";

export type ButtonVariant = "default" | "outline" | "ghost" | "destructive";
export type ButtonSize = "default" | "sm" | "icon";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ComponentChildren;
  class?: string;
}

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: ComponentChildren;
  children: ComponentChildren;
}

export interface SkeletonProps {
  class?: string;
}

export interface LinkProps {
  href: string;
  class?: string;
  children: ComponentChildren;
}

export interface FormAlertProps {
  message: string;
}

export type CardProps = ComponentProps<"div">;
export type CardTitleProps = ComponentProps<"h3">;
export type CardDescriptionProps = ComponentProps<"p">;
export type InputProps = ComponentProps<"input">;
export type TextareaProps = ComponentProps<"textarea">;
export type LabelProps = ComponentProps<"label">;

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onCheckedChange: () => void;
}
