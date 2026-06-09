import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { POMODORO_TASK_REPOSITORY } from '../../domain/repositories/pomodoro-task.repository.interface';
import { PrismaPomodoroTaskRepository } from './repositories/prisma-pomodoro-task.repository';
import { POMODORO_SESSION_REPOSITORY } from '../../domain/repositories/pomodoro-session.repository.interface';
import { PrismaPomodoroSessionRepository } from './repositories/prisma-pomodoro-session.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: POMODORO_TASK_REPOSITORY,
      useClass: PrismaPomodoroTaskRepository,
    },
    {
      provide: POMODORO_SESSION_REPOSITORY,
      useClass: PrismaPomodoroSessionRepository,
    },
  ],
  exports: [
    PrismaService,
    USER_REPOSITORY,
    POMODORO_TASK_REPOSITORY,
    POMODORO_SESSION_REPOSITORY,
  ],
})
export class DatabaseModule {}
