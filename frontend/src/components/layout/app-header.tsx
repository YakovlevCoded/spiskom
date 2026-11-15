import { LoaderCircle, LogOut } from "lucide-preact";

import { Button } from "../ui/button";
import { Brand } from "./brand";
import { useAppHeader } from "./use-app-header";

export const AppHeader = () => {
  const { user, isPending, handleLogout, initial } = useAppHeader();

  return (
    <header class="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div class="mx-auto flex h-20 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Brand compact />

        <div class="flex items-center gap-2.5">
          <div class="hidden items-center gap-2.5 sm:flex">
            <span class="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
              {initial}
            </span>
            <span class="max-w-56 truncate text-sm font-semibold text-muted-foreground">
              {user?.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="gap-2 text-muted-foreground"
            disabled={isPending}
            onClick={handleLogout}
          >
            {isPending ? <LoaderCircle class="animate-spin" size={16} /> : <LogOut size={16} />}
            <span class="hidden sm:inline">Выйти</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
