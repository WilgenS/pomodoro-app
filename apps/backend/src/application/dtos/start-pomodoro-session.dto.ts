export class StartPomodoroSessionDto {
  constructor(
    public readonly taskId: string,
    public readonly userId: string,
    public readonly duration: number, // duration in minutes or seconds
  ) {}
}
