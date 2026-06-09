import { Request } from 'express';
import { JwtUser } from '../strategies/jwt.strategy';
import { JwtRefreshUser } from '../strategies/jwt-refresh.strategy';
import { GoogleUser } from '../strategies/google.strategy';

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

export interface AuthenticatedRefreshRequest extends Request {
  user: JwtRefreshUser;
}

export interface AuthenticatedGoogleRequest extends Request {
  user: GoogleUser;
}
