import { cn } from "@/lib/utils";

export const Skeleton = ({ class: className }: { class?: string }) => (
  <div class={cn("animate-pulse rounded-xl bg-muted", className)} />
);
