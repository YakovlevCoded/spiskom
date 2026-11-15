import type { ComponentChildren } from "preact";

export interface BrandProps {
  inverted?: boolean;
  compact?: boolean;
}

export interface AuthLayoutProps {
  children: ComponentChildren;
}

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ComponentChildren;
  footer?: ComponentChildren;
}
