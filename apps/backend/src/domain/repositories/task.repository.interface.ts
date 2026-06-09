import { Task, TaskStatus } from '../entities/task.entity';

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>;
  findAllByUserId(userId: string, skip?: number, take?: number): Promise<Task[]>;
  countByUserId(userId: string): Promise<number>;
  countCompletedByUserId(userId: string): Promise<number>;
  save(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
