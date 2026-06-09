export class UpdateTaskDto {
  constructor(
    public readonly title?: string,
    public readonly description?: string | null,
    public readonly estimatedPomodoros?: number,
  ) {}
}
