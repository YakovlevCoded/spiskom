import { Check, Clock3, ShieldCheck } from "lucide-preact";
import type { ComponentChildren } from "preact";

import { Brand } from "./brand";

const features = [
  { icon: Clock3, text: "Добавляйте задачи за пару секунд" },
  { icon: Check, text: "Редактируйте без лишних экранов" },
  { icon: ShieldCheck, text: "Ваши записи видите только вы" },
];

export const AuthLayout = ({ children }: { children: ComponentChildren }) => (
  <div class="min-h-screen lg:grid lg:grid-cols-[1.08fr_1fr]">
    <aside class="relative hidden overflow-hidden bg-[#244c3c] p-10 text-[#f7f2e8] lg:flex lg:flex-col lg:justify-between xl:p-14">
      <div class="pointer-events-none absolute -top-28 -right-24 size-96 rounded-full border border-white/10" />
      <div class="pointer-events-none absolute top-1/3 -left-24 size-72 rounded-full bg-white/5 blur-3xl" />
      <div class="pointer-events-none absolute right-12 bottom-20 size-24 rotate-12 rounded-[2rem] border border-white/10" />

      <div class="relative">
        <Brand inverted />
      </div>

      <div class="relative max-w-xl py-16">
        <p class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-white/65 uppercase">
          Спокойный список дел
        </p>
        <h1 class="text-5xl leading-[1.02] font-extrabold tracking-[-0.055em] text-balance xl:text-6xl">
          Меньше шума.
          <br />
          Больше сделанного.
        </h1>
        <p class="mt-6 max-w-md text-base leading-7 text-white/65">
          Списком помогает держать важное перед глазами — без досок, дедлайнов и лишних настроек.
        </p>

        <ul class="mt-9 space-y-3.5">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} class="flex items-center gap-3 text-sm font-semibold text-white/80">
              <span class="flex size-8 items-center justify-center rounded-full bg-white/10">
                <Icon size={15} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div class="relative flex items-center justify-between text-xs font-medium text-white/35">
        <span>Списком · 2026</span>
        <span>Сделано для ясной головы</span>
      </div>
    </aside>

    <main class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
      <div class="w-full max-w-md">
        <div class="mb-9 flex items-center justify-between lg:hidden">
          <Brand />
        </div>
        {children}
        <p class="mt-8 text-center text-xs leading-5 text-muted-foreground">
          Нажимая кнопку, вы подтверждаете, что готовы навести порядок в делах.
        </p>
      </div>
    </main>
  </div>
);
