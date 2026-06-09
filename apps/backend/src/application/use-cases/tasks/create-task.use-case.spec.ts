import { CreateTaskUseCase } from './create-task.use-case';
import { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { CreateTaskDto } from '../../dtos/tasks/create-task.dto';
import { Task } from '../../../domain/entities/task.entity';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
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
    useCase = new CreateTaskUseCase(repository);
  });

  it('should create a task successfully', async () => {
    const dto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      estimatedPomodoros: 4,
    };
    const userId = 'user-123';

    repository.save.mockImplementation(async (task: Task) => task);

    const result = await useCase.execute(dto, userId);

    expect(result).toBeDefined();
    expect(result.title).toBe(dto.title);
    expect(result.userId).toBe(userId);
    expect(result.estimatedPomodoros).toBe(dto.estimatedPomodoros);
    expect(repository.save).toHaveBeenCalled();
  });
});
