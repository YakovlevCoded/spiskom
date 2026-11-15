import { ClipboardList, Plus } from "lucide-preact";

import { Button } from "../ui/button";

export const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div class="rounded-[1.75rem] border border-dashed border-border bg-card/55 px-6 py-14 text-center">
    <div class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
      <ClipboardList size={28} />
    </div>
    <h2 class="mt-5 text-xl font-extrabold tracking-[-0.03em]">Пока здесь пусто</h2>
    <p class="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
      Добавьте первую задачу — начните с самого важного. Список подождёт.
    </p>
    <Button class="mt-6" onClick={onCreate}>
      <Plus size={17} />
      Добавить задачу
    </Button>
  </div>
);
