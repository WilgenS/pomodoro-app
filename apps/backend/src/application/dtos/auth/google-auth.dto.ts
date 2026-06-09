export class GoogleAuthDto {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly avatar?: string,
  ) {}
}
