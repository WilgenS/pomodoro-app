import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this task');
    }

    await this.taskRepository.delete(id);
  }
}
