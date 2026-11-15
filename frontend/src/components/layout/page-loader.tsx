import { LoaderCircle } from "lucide-preact";

import { Brand } from "./brand";

export const PageLoader = () => (
  <div class="flex min-h-screen flex-col items-center justify-center gap-6">
    <Brand />
    <LoaderCircle class="animate-spin text-primary" size={22} aria-label="Загрузка" />
  </div>
);
