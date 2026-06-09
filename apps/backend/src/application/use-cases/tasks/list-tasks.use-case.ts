import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { Task } from '../../../domain/entities/task.entity';

export interface PaginatedTasks {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ListTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userId: string, page: number = 1, limit: number = 10): Promise<PaginatedTasks> {
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
      this.taskRepository.findAllByUserId(userId, skip, limit),
      this.taskRepository.countByUserId(userId),
    ]);

    return {
      data: tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
