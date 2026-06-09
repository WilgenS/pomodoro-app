import { StartSessionUseCase } from './start-session.use-case';
import { IPomodoroSessionRepository } from '../../../domain/repositories/pomodoro-session.repository.interface';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { Task } from '../../../domain/entities/task.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('StartSessionUseCase', () => {
  let useCase: StartSessionUseCase;
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
    useCase = new StartSessionUseCase(sessionRepository, taskRepository);
  });

  it('should start a session successfully', async () => {
    const task = new Task('task-1', 'Title', 'Desc', 'TODO', 'user-123', new Date(), new Date(), 1, 0);
    taskRepository.findById.mockResolvedValue(task);
    sessionRepository.save.mockImplementation(async (session) => session);

    const result = await useCase.execute({ taskId: 'task-1' }, 'user-123');

    expect(result).toBeDefined();
    expect(result.taskId).toBe('task-1');
    expect(sessionRepository.save).toHaveBeenCalled();
  });

  it('should throw ForbiddenException if user does not own the task', async () => {
    const task = new Task('task-1', 'Title', 'Desc', 'TODO', 'owner-id', new Date(), new Date(), 1, 0);
    taskRepository.findById.mockResolvedValue(task);

    await expect(useCase.execute({ taskId: 'task-1' }, 'other-user')).rejects.toThrow(ForbiddenException);
  });
});
