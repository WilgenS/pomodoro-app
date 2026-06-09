import * as crypto from 'crypto';

export class PomodoroSession {
  constructor(
    public readonly id: string,
    public readonly startedAt: Date,
    public endedAt: Date | null,
    public duration: number, // duration in seconds
    public readonly taskId: string,
    public readonly userId: string,
  ) {}

  static create(taskId: string, userId: string, duration: number = 1500): PomodoroSession {
    return new PomodoroSession(
      crypto.randomUUID(),
      new Date(),
      null,
      duration,
      taskId,
      userId,
    );
  }
}
