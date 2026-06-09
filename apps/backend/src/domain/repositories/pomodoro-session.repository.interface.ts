import { PomodoroSession } from '../entities/pomodoro-session.entity';

export const POMODORO_SESSION_REPOSITORY = 'POMODORO_SESSION_REPOSITORY';

export interface IPomodoroSessionRepository {
  findById(id: string): Promise<PomodoroSession | null>;
  findAllByUserId(userId: string): Promise<PomodoroSession[]>;
  findAllByTaskId(taskId: string): Promise<PomodoroSession[]>;
  save(session: PomodoroSession): Promise<PomodoroSession>;
  update(session: PomodoroSession): Promise<PomodoroSession>;
  countByUserId(userId: string): Promise<number>;
  getTotalDurationByUserId(userId: string): Promise<number>;
}
