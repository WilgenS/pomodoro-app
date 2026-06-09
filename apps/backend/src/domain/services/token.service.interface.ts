export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface ITokenPayload {
  sub: string;
  email: string;
}

export interface ITokenService {
  generateAccessToken(payload: ITokenPayload): string;
  generateRefreshToken(payload: ITokenPayload): string;
  verifyRefreshToken(token: string): ITokenPayload;
}
