import * as crypto from 'crypto';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public readonly userId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public estimatedPomodoros: number = 1,
    public completedPomodoros: number = 0,
  ) {}

  static create(title: string, userId: string, description?: string | null, estimatedPomodoros?: number): Task {
    return new Task(
      crypto.randomUUID(),
      title,
      description ?? null,
      'TODO',
      userId,
      new Date(),
      new Date(),
      estimatedPomodoros ?? 1,
      0,
    );
  }
}
