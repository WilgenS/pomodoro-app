import { Injectable } from '@nestjs/common';
import { IPomodoroTaskRepository } from '../../../domain/repositories/pomodoro-task.repository.interface';
import { PomodoroTask } from '../../../domain/entities/pomodoro-task.entity';
import { PomodoroTask as PrismaTask } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPomodoroTaskRepository implements IPomodoroTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PomodoroTask | null> {
    const task = await this.prisma.pomodoroTask.findUnique({ where: { id } });
    return task ? this.mapToDomain(task) : null;
  }

  async findByUserId(userId: string): Promise<PomodoroTask[]> {
    const tasks = await this.prisma.pomodoroTask.findMany({ where: { userId } });
    return tasks.map((task) => this.mapToDomain(task));
  }

  async save(task: PomodoroTask): Promise<PomodoroTask> {
    const data = {
      id: task.id,
      title: task.title,
      description: task.description,
      completedPomodoros: task.completedPomodoros,
      estimatedPomodoros: task.estimatedPomodoros,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
    };

    const savedTask = await this.prisma.pomodoroTask.upsert({
      where: { id: task.id },
      create: data,
      update: data,
    });
    return this.mapToDomain(savedTask);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pomodoroTask.delete({ where: { id } });
  }

  private mapToDomain(prismaTask: PrismaTask): PomodoroTask {
    return new PomodoroTask(
      prismaTask.id,
      prismaTask.title,
      prismaTask.completedPomodoros,
      prismaTask.estimatedPomodoros,
      prismaTask.status,
      prismaTask.createdAt,
      prismaTask.userId,
      prismaTask.description,
    );
  }
}
