import { Module } from '@nestjs/common';
import { StatisticsController } from '../../presentation/controllers/statistics.controller';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import { POMODORO_SESSION_REPOSITORY } from '../../domain/repositories/pomodoro-session.repository.interface';
import { PrismaTaskRepository } from '../database/repositories/prisma-task.repository';
import { PrismaPomodoroSessionRepository } from '../database/repositories/prisma-pomodoro-session.repository';
import { GetStatisticsUseCase } from '../../application/use-cases/statistics/get-statistics.use-case';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [StatisticsController],
  providers: [
    PrismaService,
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },
    {
      provide: POMODORO_SESSION_REPOSITORY,
      useClass: PrismaPomodoroSessionRepository,
    },
    {
      provide: GetStatisticsUseCase,
      useFactory: (taskRepo, sessionRepo) => new GetStatisticsUseCase(taskRepo, sessionRepo),
      inject: [TASK_REPOSITORY, POMODORO_SESSION_REPOSITORY],
    },
  ],
})
export class StatisticsModule {}
