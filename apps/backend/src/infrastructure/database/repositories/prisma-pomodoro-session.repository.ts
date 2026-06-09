import { Injectable } from '@nestjs/common';
import { IPomodoroSessionRepository } from '../../../domain/repositories/pomodoro-session.repository.interface';
import { PomodoroSession } from '../../../domain/entities/pomodoro-session.entity';
import { PrismaService } from '../prisma.service';
import { PomodoroSession as PrismaSession } from '@prisma/client';

@Injectable()
export class PrismaPomodoroSessionRepository implements IPomodoroSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(prismaSession: PrismaSession): PomodoroSession {
    return new PomodoroSession(
      prismaSession.id,
      prismaSession.startedAt,
      prismaSession.endedAt,
      prismaSession.duration,
      prismaSession.taskId,
      prismaSession.userId,
    );
  }

  async findById(id: string): Promise<PomodoroSession | null> {
    const prismaSession = await this.prisma.pomodoroSession.findUnique({
      where: { id },
    });
    return prismaSession ? this.mapToDomain(prismaSession) : null;
  }

  async findAllByUserId(userId: string): Promise<PomodoroSession[]> {
    const prismaSessions = await this.prisma.pomodoroSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
    });
    return prismaSessions.map(this.mapToDomain);
  }

  async findAllByTaskId(taskId: string): Promise<PomodoroSession[]> {
    const prismaSessions = await this.prisma.pomodoroSession.findMany({
      where: { taskId },
      orderBy: { startedAt: 'desc' },
    });
    return prismaSessions.map(this.mapToDomain);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.prisma.pomodoroSession.count({
      where: { userId },
    });
  }

  async getTotalDurationByUserId(userId: string): Promise<number> {
    const result = await this.prisma.pomodoroSession.aggregate({
      where: { userId },
      _sum: {
        duration: true,
      },
    });
    return result._sum.duration || 0;
  }

  async save(session: PomodoroSession): Promise<PomodoroSession> {
    const prismaSession = await this.prisma.pomodoroSession.create({
      data: {
        id: session.id,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        duration: session.duration,
        taskId: session.taskId,
        userId: session.userId,
      },
    });
    return this.mapToDomain(prismaSession);
  }

  async update(session: PomodoroSession): Promise<PomodoroSession> {
    const prismaSession = await this.prisma.pomodoroSession.update({
      where: { id: session.id },
      data: {
        endedAt: session.endedAt,
        duration: session.duration,
      },
    });
    return this.mapToDomain(prismaSession);
  }
}
