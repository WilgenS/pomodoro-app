import { DeleteTaskUseCase } from './delete-task.use-case';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { Task } from '../../../domain/entities/task.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
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
    useCase = new DeleteTaskUseCase(repository);
  });

  it('should delete a task successfully', async () => {
    const task = new Task('task-1', 'Title', 'Desc', 'TODO', 'user-123', new Date(), new Date(), 1, 0);
    repository.findById.mockResolvedValue(task);

    await useCase.execute('task-1', 'user-123');

    expect(repository.delete).toHaveBeenCalledWith('task-1');
  });

  it('should throw ForbiddenException if user is not the owner', async () => {
    const task = new Task('task-1', 'Title', 'Desc', 'TODO', 'owner-id', new Date(), new Date(), 1, 0);
    repository.findById.mockResolvedValue(task);

    await expect(useCase.execute('task-1', 'other-user')).rejects.toThrow(ForbiddenException);
  });
});
