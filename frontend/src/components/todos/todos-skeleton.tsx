import { Skeleton } from "../ui/skeleton";

export const TodosSkeleton = () => (
  <div class="space-y-3" aria-label="Загрузка задач">
    {[0, 1, 2].map((item) => (
      <div key={item} class="rounded-2xl border border-border/80 bg-card p-5 sm:p-6">
        <Skeleton class="h-5 w-2/5" />
        <Skeleton class="mt-3 h-4 w-4/5" />
        <Skeleton class="mt-5 h-3 w-40" />
      </div>
    ))}
  </div>
);
