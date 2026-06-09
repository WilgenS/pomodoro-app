import { Module } from '@nestjs/common';
import { TasksController } from '../../presentation/controllers/tasks.controller';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import { PrismaTaskRepository } from '../database/repositories/prisma-task.repository';
import { CreateTaskUseCase } from '../../application/use-cases/tasks/create-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/tasks/list-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/tasks/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/tasks/delete-task.use-case';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [
    PrismaService,
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (taskRepo) => new CreateTaskUseCase(taskRepo),
      inject: [TASK_REPOSITORY],
    },
    {
      provide: ListTasksUseCase,
      useFactory: (taskRepo) => new ListTasksUseCase(taskRepo),
      inject: [TASK_REPOSITORY],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (taskRepo) => new UpdateTaskUseCase(taskRepo),
      inject: [TASK_REPOSITORY],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (taskRepo) => new DeleteTaskUseCase(taskRepo),
      inject: [TASK_REPOSITORY],
    },
  ],
  exports: [CreateTaskUseCase, ListTasksUseCase, UpdateTaskUseCase, DeleteTaskUseCase],
})
export class TasksModule {}
