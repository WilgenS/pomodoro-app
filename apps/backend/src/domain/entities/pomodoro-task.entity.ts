import { TaskStatus, TaskStatusValue } from '../value-objects/task-status.value-object';
import { DomainException } from '../exceptions/domain.exception';

export class PomodoroTask {
  private _status: TaskStatus;

  constructor(
    public readonly id: string,
    public readonly title: string,
    private _completedPomodoros: number,
    private _estimatedPomodoros: number,
    status: string,
    public readonly createdAt: Date,
    public readonly userId: string,
    public readonly description?: string | null,
  ) {
    this._status = TaskStatus.create(status);
    this.validate();
  }

  get status(): TaskStatusValue {
    return this._status.value;
  }

  get completedPomodoros(): number {
    return this._completedPomodoros;
  }

  get estimatedPomodoros(): number {
    return this._estimatedPomodoros;
  }

  private validate(): void {
    if (!this.title || this.title.trim() === '') {
      throw new DomainException('Task title cannot be empty');
    }
    if (this._estimatedPomodoros < 1) {
      throw new DomainException('Estimated pomodoros must be at least 1');
    }
    if (this._completedPomodoros < 0) {
      throw new DomainException('Completed pomodoros cannot be negative');
    }
  }

  public addCompletedPomodoro(): void {
    this._completedPomodoros++;
    if (this._status.value === 'TODO') {
      this._status = TaskStatus.create('IN_PROGRESS');
    }
  }

  public completeTask(): void {
    this._status = TaskStatus.create('COMPLETED');
  }

  public markInProgress(): void {
    if (this._status.value === 'COMPLETED') {
      throw new DomainException('Cannot mark a completed task as in progress');
    }
    this._status = TaskStatus.create('IN_PROGRESS');
  }

  public updateDetails(title: string, description?: string | null, estimatedPomodoros?: number): PomodoroTask {
    if (!title || title.trim() === '') {
      throw new DomainException('Task title cannot be empty');
    }
    
    let newEstimated = this._estimatedPomodoros;
    if (estimatedPomodoros !== undefined) {
      if (estimatedPomodoros < 1) {
        throw new DomainException('Estimated pomodoros must be at least 1');
      }
      newEstimated = estimatedPomodoros;
    }

    return new PomodoroTask(
      this.id,
      title,
      this._completedPomodoros,
      newEstimated,
      this._status.value,
      this.createdAt,
      this.userId,
      description !== undefined ? description : this.description,
    );
  }
}
