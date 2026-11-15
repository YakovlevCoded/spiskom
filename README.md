# Списком

Спокойный список задач: регистрация, вход, создание, редактирование и удаление записей. Интерфейс полностью на русском, данные пользователя видны только ему.

![Вход](docs/screenshots/login.jpg)

![Список задач](docs/screenshots/todos.jpg)

## Возможности

- Регистрация и вход по email и паролю.
- Выход и восстановление пароля по ссылке из письма.
- Создание задач с заголовком и описанием.
- Редактирование и удаление задач.
- Дата создания хранится на сервере и показывается в списке.
- Защищённые маршруты и сессия в `httpOnly` cookie.
- Проверка ввода на клиенте и сервере.
- Адаптивный интерфейс на русском.
- Локальная почта через Mailpit.
- Одна команда для запуска всего стека в Docker.

## Стек

| Слой | Технологии |
| --- | --- |
| Frontend | Preact, Vite, TypeScript, Tailwind CSS, shadcn-подход к UI |
| Backend | Node.js, Express 5, TypeScript, Zod |
| База данных | PostgreSQL, Prisma |
| Авторизация | bcryptjs, JWT, httpOnly cookie |
| Почта | Nodemailer, Mailpit, Resend API или SMTP |
| Деплой | Netlify, Netlify Functions |
| Качество | ESLint, Prettier, Husky, GitHub Actions |

## Быстрый старт

Нужен только Docker с Docker Compose.

```bash
git clone <repo-url>
cd hookahton
./start.sh
```

Или без скрипта:

```bash
docker compose up --build
```

После запуска:

| Сервис | Адрес |
| --- | --- |
| Приложение | http://localhost:8080 |
| API | http://localhost:4000/api |
| Проверка API | http://localhost:4000/api/health |
| Письма Mailpit | http://localhost:8025 |

Первый запуск собирает образы и применяет миграции автоматически. Отдельно создавать `.env`, базу или таблицы не нужно.

Остановить:

```bash
./stop.sh
```

Удалить контейнеры вместе с локальной базой:

```bash
docker compose down -v
```

## Как проверить сценарии

1. Откройте http://localhost:8080.
2. Зарегистрируйте пользователя.
3. Создайте задачу с заголовком и описанием.
4. Отредактируйте её.
5. Удалите задачу и подтвердите действие.
6. Выйдите из аккаунта.
7. Нажмите «Забыли пароль?», укажите email.
8. Откройте письмо в Mailpit и перейдите по ссылке.
9. Задайте новый пароль и войдите с ним.

## Локальная разработка без Docker

Понадобятся Node.js 22+ и PostgreSQL.

```bash
npm install
npm run setup
```

Создайте базу и настройте окружение:

```bash
createdb spiskom
cp backend/.env.example backend/.env
```

В `backend/.env` укажите свои `DATABASE_URL` и `DIRECT_URL`, затем примените миграции:

```bash
npm --prefix backend run db:migrate
```

Запустите API и фронтенд одной командой:

```bash
npm run dev
```

- Vite: http://localhost:5173
- API: http://localhost:4000
- Vite проксирует `/api` на API, поэтому cookie работает как same-origin.

Если SMTP не настроен, письма выводятся в консоль API вместе со ссылкой сброса. Это удобно для локальной проверки без почтового сервиса.

## Переменные окружения

Пример находится в `backend/.env.example`.

| Переменная | Назначение |
| --- | --- |
| `NODE_ENV` | `development`, `test` или `production` |
| `PORT` | Порт API, по умолчанию `4000` |
| `DATABASE_URL` | Подключение Prisma к PostgreSQL |
| `DIRECT_URL` | Прямое подключение для миграций |
| `JWT_SECRET` | Секрет подписи сессии, минимум 32 символа |
| `APP_URL` | Публичный адрес приложения для ссылок в письмах |
| `WEB_ORIGIN` | Origin фронтенда для CORS |
| `COOKIE_SECURE` | `true` для HTTPS, `false` для локального HTTP |
| `SMTP_HOST` | SMTP-сервер |
| `SMTP_PORT` | Порт SMTP |
| `SMTP_USER` | Логин SMTP |
| `SMTP_PASSWORD` | Пароль SMTP |
| `MAIL_FROM` | Отправитель писем |
| `RESEND_API_KEY` | Ключ Resend, альтернатива SMTP |

В Docker все локальные значения уже заданы в `docker-compose.yml`.

## API

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

GET    /api/todos
POST   /api/todos
PATCH  /api/todos/:id
DELETE /api/todos/:id

GET    /api/health
```

Ошибки возвращаются в формате:

```json
{
  "message": "Понятное описание ошибки",
  "fields": {
    "email": "Введите корректный email"
  }
}
```

## Структура

```text
.
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   └── todos/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── netlify/functions/api.ts
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── auth/
│   │   │   ├── todos/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── schemas/
│   │   └── types/
│   ├── nginx.conf
│   └── Dockerfile
├── docs/screenshots/
├── scripts/netlify-build.sh
├── docker-compose.yml
├── netlify.toml
├── start.sh
└── stop.sh
```

### Границы ответственности

- `frontend/src/types` — только типы.
- `frontend/src/api` — HTTP-запросы.
- `frontend/src/hooks` — состояние, мутации и формы.
- `frontend/src/components/ui` — визуальные примитивы.
- `frontend/src/components/todos` и `auth` — презентационные компоненты.
- `frontend/src/pages` — композиция.
- `backend/src/modules/*/routes` — HTTP и валидация.
- `backend/src/modules/*/service` — бизнес-логика и Prisma.
- `backend/src/lib` — общие интеграции.

Компоненты не делают запросы напрямую. Хуки небольшие и отвечают за одно действие.

## Безопасность

- Пароли хранятся как bcrypt-хеши.
- JWT передаётся в `httpOnly` cookie, не в localStorage.
- Cookie `SameSite=Lax`, в production — `Secure`.
- Запросы к задачам всегда фильтруются по текущему пользователю.
- Есть rate limit на авторизацию и восстановление пароля.
- Валидация выполняется на клиенте и повторно на сервере.
- Токен сброса пароля хранится в виде SHA-256-хеша, действует один час и используется один раз.
- Ответ на запрос сброса не раскрывает, существует ли аккаунт.

## Качество кода

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

- ESLint 9 с type-aware правилами.
- Prettier и сортировка Tailwind-классов.
- Сортировка импортов.
- Запрет комментариев в коде через собственное правило ESLint.
- Ограничение размера хуков.
- Husky: pre-commit запускает линтеры, pre-push — проверку типов.
- GitHub Actions проверяет lint, типы и сборку обоих приложений.

## Деплой в Netlify

Проект уже содержит `netlify.toml`, сборку и serverless-функцию API. Фронтенд и API живут на одном домене: запросы `/api/*` идут в функцию, поэтому cookie остаётся first-party.

1. Подключите репозиторий к Netlify.
2. Netlify прочитает команду сборки из `netlify.toml`.
3. Создайте PostgreSQL в Supabase или другом managed-сервисе.
4. Добавьте переменные окружения в Netlify:

```text
NODE_ENV=production
DATABASE_URL=postgresql://...pooler...:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://...:5432/postgres
JWT_SECRET=<длинный случайный секрет>
APP_URL=https://<ваш-сайт>.netlify.app
WEB_ORIGIN=https://<ваш-сайт>.netlify.app
COOKIE_SECURE=true
MAIL_FROM=Списком <no-reply@your-domain.ru>
RESEND_API_KEY=<ключ Resend>
```

Вместо `RESEND_API_KEY` можно передать `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` и `SMTP_PASSWORD`.

5. Примените миграции к production-базе:

```bash
DATABASE_URL="<pooler-url>" DIRECT_URL="<direct-url>" npm --prefix backend run db:deploy
```

6. Задеплойте сайт.

Supabase здесь используется только как PostgreSQL. Авторизация, API и Prisma остаются внутри проекта. Для локального запуска Supabase не нужен.

## Ограничения

- Нет подтверждения email при регистрации.
- Нет команд, ролей и совместного доступа.
- Список задач не разбит на страницы.
- Восстановление пароля зависит от настроенного почтового провайдера в production.

## Лицензия

MIT.
