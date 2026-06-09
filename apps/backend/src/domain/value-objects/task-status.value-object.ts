import { ValueObject } from './value-object';
import { DomainException } from '../exceptions/domain.exception';

export type TaskStatusValue = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

interface TaskStatusProps {
  value: TaskStatusValue;
}

export class TaskStatus extends ValueObject<TaskStatusProps> {
  private constructor(props: TaskStatusProps) {
    super(props);
  }

  public get value(): TaskStatusValue {
    return this.props.value;
  }

  public static create(status: string): TaskStatus {
    if (!['TODO', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      throw new DomainException(`Invalid task status: ${status}`);
    }
    return new TaskStatus({ value: status as TaskStatusValue });
  }
}
