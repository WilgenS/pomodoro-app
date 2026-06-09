import { IPomodoroSessionRepository } from '../../../domain/repositories/pomodoro-session.repository.interface';
import { EndSessionDto } from '../../dtos/sessions/session.dto';
import { PomodoroSession } from '../../../domain/entities/pomodoro-session.entity';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

export class EndSessionUseCase {
  constructor(
    private readonly sessionRepository: IPomodoroSessionRepository,
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string, dto: EndSessionDto, userId: string): Promise<PomodoroSession> {
    const session = await this.sessionRepository.findById(id);

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('You do not have permission to end this session');
    }

    if (session.endedAt) {
      throw new BadRequestException('Session is already ended');
    }

    session.endedAt = new Date();
    
    // Calculate duration in seconds if not provided
    if (dto.actualDuration !== undefined) {
      session.duration = dto.actualDuration;
    } else {
      session.duration = Math.floor((session.endedAt.getTime() - session.startedAt.getTime()) / 1000);
    }

    const updatedSession = await this.sessionRepository.update(session);

    // Increment completedPomodoros on related task
    const task = await this.taskRepository.findById(session.taskId);
    if (task) {
      task.completedPomodoros += 1;
      await this.taskRepository.update(task);
    }

    return updatedSession;
  }
}
