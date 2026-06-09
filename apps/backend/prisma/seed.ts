import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      provider: 'local',
    },
  });

  const task = await prisma.pomodoroTask.create({
    data: {
      title: 'First task',
      description: 'This is a seeded task',
      estimatedPomodoros: 4,
      userId: user.id,
    },
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
