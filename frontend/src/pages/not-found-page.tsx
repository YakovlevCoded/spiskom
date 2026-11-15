import { ArrowLeft } from "lucide-preact";

import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export const NotFoundPage = () => (
  <main class="flex min-h-screen flex-col items-center justify-center px-5 py-12 text-center">
    <Brand />
    <p class="mt-12 text-[11px] font-extrabold tracking-[0.2em] text-muted-foreground uppercase">
      Ошибка 404
    </p>
    <h1 class="mt-4 text-5xl font-extrabold tracking-[-0.06em] sm:text-7xl">Страница потерялась</h1>
    <p class="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
      Такой страницы нет. Возможно, ссылка устарела или в адресе опечатка.
    </p>
    <Link href="/" class="mt-8">
      <Button>
        <ArrowLeft size={16} />К задачам
      </Button>
    </Link>
  </main>
);
