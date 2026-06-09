export class User {
  private _refreshToken: string | null;

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly provider: string,
    public readonly createdAt: Date,
    public readonly avatar?: string | null,
    refreshToken?: string | null,
  ) {
    this._refreshToken = refreshToken || null;
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  public updateRefreshToken(token: string | null): void {
    this._refreshToken = token;
  }
}

