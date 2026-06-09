export class CreateTaskDto {
  constructor(
    public readonly title: string,
    public readonly userId: string,
    public readonly estimatedPomodoros: number,
    public readonly description?: string | null,
  ) {}
}
