import { hash } from "bcryptjs";

import { prisma } from "../src/lib/prisma";

const seed = async () => {
  const email = "demo@spiskom.ru";
  const passwordHash = await hash("demo12345", 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash },
  });

  const existingTodos = await prisma.todo.count({ where: { userId: user.id } });

  if (existingTodos === 0) {
    await prisma.todo.createMany({
      data: [
        {
          userId: user.id,
          title: "Навести порядок в списке дел",
          description: "Вычеркнуть лишнее, оставить важное.",
        },
        {
          userId: user.id,
          title: "Подготовить презентацию",
          description: "Собрать три главных слайда и проверить цифры.",
        },
        {
          userId: user.id,
          title: "Забронировать столик на вечер",
          description: "На 19:30, у окна.",
        },
      ],
    });
  }

  console.info("Демо-аккаунт готов: demo@spiskom.ru / demo12345");
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
