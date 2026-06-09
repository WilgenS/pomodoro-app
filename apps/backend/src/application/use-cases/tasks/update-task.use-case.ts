import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { UpdateTaskDto } from '../../dtos/tasks/update-task.dto';
import { Task } from '../../../domain/entities/task.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string, dto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have permission to update this task');
    }

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.estimatedPomodoros !== undefined) task.estimatedPomodoros = dto.estimatedPomodoros;

    task.updatedAt = new Date();

    return this.taskRepository.update(task);
  }
}
