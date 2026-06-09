import { IPomodoroSessionRepository } from '../../../domain/repositories/pomodoro-session.repository.interface';
import { StartSessionDto } from '../../dtos/sessions/session.dto';
import { PomodoroSession } from '../../../domain/entities/pomodoro-session.entity';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class StartSessionUseCase {
  constructor(
    private readonly sessionRepository: IPomodoroSessionRepository,
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(dto: StartSessionDto, userId: string): Promise<PomodoroSession> {
    const task = await this.taskRepository.findById(dto.taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${dto.taskId} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have permission to start a session for this task');
    }

    const session = PomodoroSession.create(dto.taskId, userId, dto.duration);
    return this.sessionRepository.save(session);
  }
}
