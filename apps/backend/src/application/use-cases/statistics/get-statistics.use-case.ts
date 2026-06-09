import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { IPomodoroSessionRepository } from '../../../domain/repositories/pomodoro-session.repository.interface';

export interface UserStatistics {
  totalFocusTime: number; // in seconds
  completedSessionsCount: number;
  completedTasksCount: number;
}

export class GetStatisticsUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly sessionRepository: IPomodoroSessionRepository,
  ) {}

  async execute(userId: string): Promise<UserStatistics> {
    const [totalFocusTime, completedSessionsCount, completedTasksCount] = await Promise.all([
      this.sessionRepository.getTotalDurationByUserId(userId),
      this.sessionRepository.countByUserId(userId),
      this.taskRepository.countCompletedByUserId(userId),
    ]);

    return {
      totalFocusTime,
      completedSessionsCount,
      completedTasksCount,
    };
  }
}
