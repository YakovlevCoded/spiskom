import { ListTodo } from "lucide-preact";

import { cn } from "@/lib/utils";

interface BrandProps {
  inverted?: boolean;
  compact?: boolean;
}

export const Brand = ({ inverted = false, compact = false }: BrandProps) => (
  <div class="flex items-center gap-3">
    <div
      class={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-[14px] shadow-sm",
        inverted ? "bg-white/12 text-white" : "bg-primary text-primary-foreground",
      )}
    >
      <ListTodo size={21} strokeWidth={2.4} />
    </div>
    <div class={cn("leading-none", compact && "hidden sm:block")}>
      <div
        class={cn(
          "text-lg font-extrabold tracking-[-0.04em]",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        Списком
      </div>
      <div
        class={cn(
          "mt-1 text-[10px] font-bold tracking-[0.18em] uppercase",
          inverted ? "text-white/45" : "text-muted-foreground",
        )}
      >
        задачи без лишнего
      </div>
    </div>
  </div>
);
