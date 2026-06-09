import { UpdateTaskUseCase } from './update-task.use-case';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { Task } from '../../../domain/entities/task.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let repository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAllByUserId: jest.fn(),
      countByUserId: jest.fn(),
      countCompletedByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new UpdateTaskUseCase(repository);
  });

  it('should update a task successfully', async () => {
    const task = new Task('task-1', 'Old Title', 'Old Desc', 'TODO', 'user-123', new Date(), new Date(), 1, 0);
    repository.findById.mockResolvedValue(task);
    repository.update.mockResolvedValue(task);

    const result = await useCase.execute('task-1', { title: 'New Title' }, 'user-123');

    expect(result.title).toBe('New Title');
    expect(repository.update).toHaveBeenCalled();
  });

  it('should throw NotFoundException if task not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute('none', {}, 'user-123')).rejects.toThrow(NotFoundException);
  });

  it('should throw ForbiddenException if user is not the owner', async () => {
    const task = new Task('task-1', 'Title', 'Desc', 'TODO', 'owner-id', new Date(), new Date(), 1, 0);
    repository.findById.mockResolvedValue(task);

    await expect(useCase.execute('task-1', {}, 'other-user')).rejects.toThrow(ForbiddenException);
  });
});
