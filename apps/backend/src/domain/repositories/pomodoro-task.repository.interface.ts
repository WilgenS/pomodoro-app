import { PomodoroTask } from '../entities/pomodoro-task.entity';

export const POMODORO_TASK_REPOSITORY = Symbol('POMODORO_TASK_REPOSITORY');

export interface IPomodoroTaskRepository {
  findById(id: string): Promise<PomodoroTask | null>;
  findByUserId(userId: string): Promise<PomodoroTask[]>;
  save(task: PomodoroTask): Promise<PomodoroTask>;
  delete(id: string): Promise<void>;
}
