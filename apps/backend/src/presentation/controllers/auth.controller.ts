import { Controller, Get, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Response, Request } from 'express';
import { GoogleLoginUseCase } from '../../application/use-cases/auth/google-login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.use-case';
import { LogoutUseCase } from '../../application/use-cases/auth/logout.use-case';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../../infrastructure/auth/guards/jwt-refresh.guard';
import { GoogleOauthGuard } from '../../infrastructure/auth/guards/google-oauth.guard';
import type {
  AuthenticatedRequest,
  AuthenticatedRefreshRequest,
  AuthenticatedGoogleRequest,
} from '../../infrastructure/auth/interfaces/authenticated-request.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleLoginUseCase: GoogleLoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth2 login' })
  async googleAuth(@Req() _req: Request) { }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({ summary: 'Google OAuth2 callback' })
  async googleAuthRedirect(@Req() req: AuthenticatedGoogleRequest, @Res() res: Response) {
    const tokens = await this.googleLoginUseCase.execute(req.user);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Req() req: AuthenticatedRefreshRequest, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    const tokens = await this.refreshTokenUseCase.execute(req.user.id, refreshToken);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.json({ success: true });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    await this.logoutUseCase.execute(req.user.id);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.json({ success: true });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current authenticated user' })
  async getMe(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
