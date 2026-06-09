import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { CreateTaskDto } from '../../dtos/tasks/create-task.dto';
import { Task } from '../../../domain/entities/task.entity';

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(dto: CreateTaskDto, userId: string): Promise<Task> {
    const task = Task.create(dto.title, userId, dto.description, dto.estimatedPomodoros);
    return this.taskRepository.save(task);
  }
}
