/*
  Warnings:

  - You are about to drop the column `discription` on the `ToDo` table. All the data in the column will be lost.
  - Added the required column `description` to the `ToDo` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `ToDo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `toDoId` on table `ToDoLog` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ToDoStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "HabitTimeLog" DROP CONSTRAINT "HabitTimeLog_habitId_fkey";

-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToDoLog" DROP CONSTRAINT "ToDoLog_toDoId_fkey";

-- AlterTable
ALTER TABLE "ToDo" DROP COLUMN "discription",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ToDoStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ToDoLog" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "toDoId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Habit_userId_deleted_idx" ON "Habit"("userId", "deleted");

-- CreateIndex
CREATE INDEX "HabitTimeLog_habitId_deleted_idx" ON "HabitTimeLog"("habitId", "deleted");

-- CreateIndex
CREATE INDEX "Subject_userId_deleted_idx" ON "Subject"("userId", "deleted");

-- CreateIndex
CREATE INDEX "SubjectLog_subjectId_deleted_idx" ON "SubjectLog"("subjectId", "deleted");

-- CreateIndex
CREATE INDEX "ToDo_userId_deleted_idx" ON "ToDo"("userId", "deleted");

-- CreateIndex
CREATE INDEX "ToDoLog_toDoId_deleted_idx" ON "ToDoLog"("toDoId", "deleted");

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoLog" ADD CONSTRAINT "ToDoLog_toDoId_fkey" FOREIGN KEY ("toDoId") REFERENCES "ToDo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitTimeLog" ADD CONSTRAINT "HabitTimeLog_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
