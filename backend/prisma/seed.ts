import { hash } from "bcryptjs";

import { prisma } from "../src/lib/prisma";

const accounts = [
  {
    email: "demo@spiskom.ru",
    password: "demo12345",
    todos: [
      {
        title: "Навести порядок в списке дел",
        description: "Вычеркнуть лишнее, оставить важное.",
        completed: true,
      },
      {
        title: "Подготовить презентацию",
        description: "Собрать три главных слайда и проверить цифры.",
        completed: false,
      },
      {
        title: "Забронировать столик на вечер",
        description: "На 19:30, у окна.",
        completed: false,
      },
    ],
  },
  {
    email: "test@spiskom.ru",
    password: "test12345",
    todos: [
      {
        title: "Собрать отчёт за неделю",
        description: "Сверить часы и закрытые задачи.",
        completed: true,
      },
      {
        title: "Ответить на письма",
        description: "Разобрать входящие до обеда.",
        completed: true,
      },
      {
        title: "Обновить зависимости",
        description: "Проверить сборку после обновления.",
        completed: false,
      },
      {
        title: "Написать заметки к созвону",
        description: "Коротко, по пунктам.",
        completed: false,
      },
      {
        title: "Запланировать спринт",
        description: "Три цели на неделю.",
        completed: false,
      },
    ],
  },
  {
    email: "empty@spiskom.ru",
    password: "empty12345",
    todos: [],
  },
];

const seed = async () => {
  for (const account of accounts) {
    const passwordHash = await hash(account.password, 12);

    const user = await prisma.user.upsert({
      where: { email: account.email },
      update: { passwordHash },
      create: { email: account.email, passwordHash },
    });

    const existingTodos = await prisma.todo.count({ where: { userId: user.id } });

    if (existingTodos === 0 && account.todos.length > 0) {
      await prisma.todo.createMany({
        data: account.todos.map((todo) => ({ ...todo, userId: user.id })),
      });
    }
  }

  console.info("Тестовые аккаунты готовы:");

  for (const account of accounts) {
    console.info(`${account.email} / ${account.password}`);
  }
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
