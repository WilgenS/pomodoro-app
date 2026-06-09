import { Module } from '@nestjs/common';
import { SessionsController } from '../../presentation/controllers/sessions.controller';
import { POMODORO_SESSION_REPOSITORY } from '../../domain/repositories/pomodoro-session.repository.interface';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import { PrismaPomodoroSessionRepository } from '../database/repositories/prisma-pomodoro-session.repository';
import { PrismaTaskRepository } from '../database/repositories/prisma-task.repository';
import { StartSessionUseCase } from '../../application/use-cases/sessions/start-session.use-case';
import { EndSessionUseCase } from '../../application/use-cases/sessions/end-session.use-case';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [SessionsController],
  providers: [
    PrismaService,
    {
      provide: POMODORO_SESSION_REPOSITORY,
      useClass: PrismaPomodoroSessionRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },
    {
      provide: StartSessionUseCase,
      useFactory: (sessionRepo, taskRepo) => new StartSessionUseCase(sessionRepo, taskRepo),
      inject: [POMODORO_SESSION_REPOSITORY, TASK_REPOSITORY],
    },
    {
      provide: EndSessionUseCase,
      useFactory: (sessionRepo, taskRepo) => new EndSessionUseCase(sessionRepo, taskRepo),
      inject: [POMODORO_SESSION_REPOSITORY, TASK_REPOSITORY],
    },
  ],
  exports: [StartSessionUseCase, EndSessionUseCase],
})
export class SessionsModule {}
