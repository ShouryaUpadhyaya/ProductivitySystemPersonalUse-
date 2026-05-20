import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { ToDoStatus, difficulty } from '../generated/prisma/enums.js';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // 1. Demo User
  const user = await prisma.user.upsert({
    where: { email: 'bahinchopda@gmail.com' },
    update: {},
    create: {
      email: 'bahinchopda@gmail.com',
      name: 'bahin chopda',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    },
  });

  const userId = user.id;

  // 2. Subjects
  const subjectsData = [
    { name: 'Coding', color: '#3b82f6', goalWorkSecs: 7200 },
    { name: 'Reading', color: '#10b981', goalWorkSecs: 3600 },
    { name: 'Gym', color: '#ef4444', goalWorkSecs: 5400 },
  ];

  const subjects = [];
  for (const s of subjectsData) {
    const subject = await prisma.subject.upsert({
      where: { userId_name: { userId, name: s.name } },
      update: { color: s.color, goalWorkSecs: s.goalWorkSecs, deleted: false },
      create: { ...s, userId },
    });
    subjects.push(subject);
  }

  // 3. Habits
  const habitsData = [
    {
      name: 'Write Code',
      description: 'At least 1 hour',
      difficulty: difficulty.MID,
      subjectId: subjects[0].id,
    },
    { name: 'Drink Water', description: '2 Liters', difficulty: difficulty.LOW, subjectId: null },
    {
      name: 'Read 20 pages',
      description: 'Daily reading goal',
      difficulty: difficulty.MID,
      subjectId: subjects[1].id,
    },
    {
      name: 'Workout',
      description: 'Heavy lifting',
      difficulty: difficulty.HIGH,
      subjectId: subjects[2].id,
    },
    {
      name: 'Meditate',
      description: '10 mins mindfulness',
      difficulty: difficulty.LOW,
      subjectId: null,
    },
  ];

  const habits = [];
  for (const h of habitsData) {
    const habit = await prisma.habit.upsert({
      where: { userId_name: { userId, name: h.name } },
      update: {
        description: h.description,
        difficulty: h.difficulty,
        subjectId: h.subjectId,
        deleted: false,
      },
      create: { ...h, userId },
    });
    habits.push(habit);
  }

  // 4. ToDos
  const todosData = [
    {
      title: 'Setup Project',
      description: 'Initial repo and dependencies',
      status: ToDoStatus.DONE,
      priority: 3,
      completedAt: new Date(),
    },
    {
      title: 'Design Database',
      description: 'Schema for todos and logs',
      status: ToDoStatus.DONE,
      priority: 2,
      completedAt: new Date(),
    },
    {
      title: 'Implement Auth',
      description: 'Google OAuth and JWT',
      status: ToDoStatus.IN_PROGRESS,
      priority: 3,
    },
    {
      title: 'Build UI',
      description: 'React components for dashboard',
      status: ToDoStatus.IN_PROGRESS,
      priority: 2,
    },
    {
      title: 'Write Tests',
      description: 'Unit and integration tests',
      status: ToDoStatus.PENDING,
      priority: 1,
    },
    {
      title: 'Refactor Logic',
      description: 'Cleanup controllers',
      status: ToDoStatus.PENDING,
      priority: 1,
    },
    {
      title: 'Legacy Task',
      description: 'Old cancelled requirement',
      status: ToDoStatus.CANCELLED,
      priority: 0,
    },
    {
      title: 'Documentation',
      description: 'API docs and README',
      status: ToDoStatus.PENDING,
      priority: 1,
    },
  ];

  for (const t of todosData) {
    const existing = await prisma.toDo.findFirst({
      where: { userId, title: t.title, deleted: false },
    });
    if (!existing) {
      await prisma.toDo.create({
        data: { ...t, userId },
      });
    }
  }

  // 5. Logs (Subject & Habit)
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(10, 0, 0, 0);

    // Daily Rating
    await prisma.dailyRating.upsert({
      where: { userId_date: { userId, date } },
      update: { rating: Math.floor(Math.random() * 3) + 3 },
      create: {
        userId,
        date,
        rating: Math.floor(Math.random() * 3) + 3,
        description: 'Seeded rating',
      },
    });

    // Subject Log
    const existingSubjectLog = await prisma.subjectLog.findFirst({
      where: { subjectId: subjects[0].id, startedAt: date },
    });
    if (!existingSubjectLog) {
      await prisma.subjectLog.create({
        data: {
          subjectId: subjects[0].id,
          startedAt: date,
          endedAt: new Date(date.getTime() + 3600000), // 1 hour
        },
      });
    }

    // Habit Log
    const existingHabitLog = await prisma.habitTimeLog.findFirst({
      where: { habitId: habits[0].id, startedAt: date },
    });
    if (!existingHabitLog) {
      await prisma.habitTimeLog.create({
        data: {
          habitId: habits[0].id,
          startedAt: date,
          endedAt: new Date(date.getTime() + 1800000), // 30 mins
        },
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
