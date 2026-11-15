# AGENTS.md

Правила для людей и AI-агентов, которые меняют проект «Списком».

## Что это за проект

Full-stack список задач: Preact SPA, Express API, PostgreSQL и Prisma. Frontend и API деплоятся на Netlify, production-база — Supabase. Локально всё поднимается через Docker Compose.

## Быстрые команды

```bash
./start.sh
./stop.sh
npm run dev
npm run lint
npm run typecheck
npm run format:check
npm run build
./deploy.sh
```

Перед коммитом обязательны `npm run lint`, `npm run typecheck` и `npm run format:check`.

## Структура

```text
frontend/src/types
frontend/src/api
frontend/src/hooks
frontend/src/components/ui
frontend/src/components/auth
frontend/src/components/todos
frontend/src/components/layout
frontend/src/pages
frontend/src/context
backend/src/modules/auth
backend/src/modules/todos
backend/src/middleware
backend/src/lib
backend/src/config
```

## Жёсткие правила frontend

- UI-тексты, ошибки, письма и README — на русском.
- Идентификаторы в коде — на английском.
- Комментарии в коде запрещены. Это проверяет собственное правило ESLint.
- Все типы и интерфейсы живут в `frontend/src/types`. В компонентах нельзя объявлять `interface` или `type` для props.
- Компонент получает данные и колбэки через props и не вызывает API.
- HTTP-запросы живут только в `frontend/src/api`.
- Состояние, эффекты, refs, обработка форм и запросы живут в `use-*` хуках.
- Хуки, относящиеся к поведению конкретного UI, лежат рядом с компонентом: `components/**/use-*.ts`.
- Хук должен делать одно действие. Лимит — 30 строк на функцию, 80 строк на файл.
- Компонент или страница — не больше 180 строк, функция компонента — не больше 130 строк.
- UI-примитив — не больше 120 строк, функция — не больше 90 строк.
- В `.tsx` компонентах и страницах запрещены `useState`, `useEffect`, `useRef` и `fetch`. Эти правила проверяет ESLint.
- UI-примитивы не импортируют `@/api`, `@/context`, `@/hooks`, `@/pages` и `@/components/*`.
- Компоненты не импортируют `@/api`, `@/context` и `@/pages`.
- Страницы не импортируют `@/api` и `@/context`.
- Хуки не импортируют `@/components/*` и `@/pages/*`.
- Один компонент — одна понятная ответственность. Большой экран разбивается на компоненты и хуки.
- Для условных классов использовать `cn()`.
- Для UI-примитивов использовать shadcn-структуру и компоненты из `frontend/src/components/ui`.
- Дизайн-токены, варианты и правила описаны в [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Жёсткие правила backend

- Маршруты (`*.routes.ts`) отвечают за HTTP, валидацию и статусы.
- Бизнес-логика и Prisma живут в `*.service.ts`.
- Маршруты не импортируют Prisma.
- Сервисы не импортируют Express и middleware.
- Типы модуля — в `*.types.ts`, схемы Zod — в `*.schemas.ts`.
- Все входные данные проверяются Zod на сервере.
- Пользовательские задачи всегда фильтруются по `userId`.
- Ошибки отдаются в едином формате `{ message, fields? }`.
- Пароли хранятся только как bcrypt-хеши.
- JWT передаётся в `httpOnly` cookie.
- Секреты не попадают в git.

## Импорты и типы

- Использовать `import type` для типов.
- Сортировка импортов автоматическая, вручную не выравнивать.
- Не использовать `any`.
- Не использовать default export для компонентов и хуков.
- Общие типы frontend — в `frontend/src/types`, а не рядом с компонентом.
- Типы API и DTO не смешивать с UI-типами.

## Линтеры

- ESLint 9 flat config, type-aware правила.
- Prettier отвечает за форматирование.
- `simple-import-sort` сортирует импорты.
- `react-hooks` проверяет правила хуков.
- `max-lines`, `max-lines-per-function`, `max-depth`, `max-params`, `complexity` ограничивают размер и сложность.
- `no-restricted-imports` охраняет границы слоёв.
- `no-restricted-syntax` запрещает UI-логику в компонентах.
- `no-comments` запрещает комментарии.
- Husky запускает lint на pre-commit и typecheck на pre-push.

## Окружение

- Локальный Docker: корневой `.env`, шаблон `.env.example`.
- API без Docker: `backend/.env`, шаблон `backend/.env.example`.
- Production: `backend/.env.production`, шаблон `backend/.env.supabase.example`.
- Реальный `.env` и `.env.production` не коммитить.
- Resend используется через `RESEND_API_KEY`, локальный fallback — Mailpit.
- Supabase используется только как PostgreSQL. Prisma подключается по `DATABASE_URL` и `DIRECT_URL`.

## Definition of Done

- `npm run lint` проходит.
- `npm run typecheck` проходит.
- `npm run format:check` проходит.
- `npm run build` проходит.
- Регистрация, вход, выход, CRUD задач и отметка выполнения проверены.
- Новые типы не лежат в UI-компонентах.
- Новая логика UI вынесена в хук.
- Нет комментариев в коде.
- README и `.env.example` обновлены, если изменились команды или переменные.
- Секреты не попали в git.
