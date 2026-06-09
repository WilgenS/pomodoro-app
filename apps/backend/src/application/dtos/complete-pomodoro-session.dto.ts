export class CompletePomodoroSessionDto {
  constructor(
    public readonly sessionId: string,
    public readonly userId: string,
  ) {}
}
