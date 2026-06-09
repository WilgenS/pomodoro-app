import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';
import { PrismaService } from '../prisma.service';
import { PomodoroTask as PrismaTask } from '@prisma/client';

@Injectable()
export class PrismaTaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(prismaTask: PrismaTask): Task {
    return new Task(
      prismaTask.id,
      prismaTask.title,
      prismaTask.description,
      prismaTask.status as TaskStatus,
      prismaTask.userId,
      prismaTask.createdAt,
      prismaTask.createdAt,
      prismaTask.estimatedPomodoros,
      prismaTask.completedPomodoros,
    );
  }

  async findById(id: string): Promise<Task | null> {
    const prismaTask = await this.prisma.pomodoroTask.findUnique({
      where: { id },
    });
    return prismaTask ? this.mapToDomain(prismaTask) : null;
  }

  async findAllByUserId(userId: string, skip?: number, take?: number): Promise<Task[]> {
    const prismaTasks = await this.prisma.pomodoroTask.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
    return prismaTasks.map(this.mapToDomain);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.prisma.pomodoroTask.count({
      where: { userId },
    });
  }

  async countCompletedByUserId(userId: string): Promise<number> {
    return this.prisma.pomodoroTask.count({
      where: { userId, status: 'COMPLETED' },
    });
  }

  async save(task: Task): Promise<Task> {
    const prismaTask = await this.prisma.pomodoroTask.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        estimatedPomodoros: task.estimatedPomodoros,
        completedPomodoros: task.completedPomodoros,
        userId: task.userId,
        createdAt: task.createdAt,
      },
    });
    return this.mapToDomain(prismaTask);
  }

  async update(task: Task): Promise<Task> {
    const prismaTask = await this.prisma.pomodoroTask.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        estimatedPomodoros: task.estimatedPomodoros,
        completedPomodoros: task.completedPomodoros,
      },
    });
    return this.mapToDomain(prismaTask);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pomodoroTask.delete({
      where: { id },
    });
  }
}
