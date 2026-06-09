export class GetStatisticsDto {
  constructor(public readonly userId: string) {}
}

export class StatisticsResultDto {
  constructor(
    public readonly totalTasks: number,
    public readonly completedTasks: number,
    public readonly totalPomodoros: number,
    public readonly totalTimeMinutes: number,
  ) {}
}
