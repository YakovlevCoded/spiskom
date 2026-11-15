import { cn } from "@/lib/utils";
import type { SkeletonProps } from "@/types/ui";

export const Skeleton = ({ class: className }: SkeletonProps) => (
  <div class={cn("animate-pulse rounded-xl bg-muted", className)} />
);
