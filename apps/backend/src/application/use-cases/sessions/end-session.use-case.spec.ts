import { EndSessionUseCase } from './end-session.use-case';
import { IPomodoroSessionRepository } from '../../../domain/repositories/pomodoro-session.repository.interface';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { PomodoroSession } from '../../../domain/entities/pomodoro-session.entity';
import { Task } from '../../../domain/entities/task.entity';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

describe('EndSessionUseCase', () => {
  let useCase: EndSessionUseCase;
  let sessionRepository: jest.Mocked<IPomodoroSessionRepository>;
  let taskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    sessionRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAllByUserId: jest.fn(),
      findAllByTaskId: jest.fn(),
      update: jest.fn(),
      countByUserId: jest.fn(),
      getTotalDurationByUserId: jest.fn(),
    };
    taskRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAllByUserId: jest.fn(),
      countByUserId: jest.fn(),
      countCompletedByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new EndSessionUseCase(sessionRepository, taskRepository);
  });

  it('should end a session and increment task pomodoros', async () => {
    const session = new PomodoroSession('sess-1', new Date(), null, 0, 'task-1', 'user-123');
    const task = new Task('task-1', 'Title', 'Desc', 'TODO', 'user-123', new Date(), new Date(), 4, 0);

    sessionRepository.findById.mockResolvedValue(session);
    taskRepository.findById.mockResolvedValue(task);
    sessionRepository.update.mockResolvedValue(session);
    taskRepository.update.mockResolvedValue(task);

    const result = await useCase.execute('sess-1', { actualDuration: 1500 }, 'user-123');

    expect(result.endedAt).toBeDefined();
    expect(task.completedPomodoros).toBe(1);
    expect(sessionRepository.update).toHaveBeenCalled();
    expect(taskRepository.update).toHaveBeenCalled();
  });

  it('should throw BadRequestException if session already ended', async () => {
    const session = new PomodoroSession('sess-1', new Date(), new Date(), 1500, 'task-1', 'user-123');
    sessionRepository.findById.mockResolvedValue(session);

    await expect(useCase.execute('sess-1', {}, 'user-123')).rejects.toThrow(BadRequestException);
  });
});
