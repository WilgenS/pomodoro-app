import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from '../../presentation/controllers/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

import { TOKEN_SERVICE } from '../../domain/services/token.service.interface';
import { HASH_SERVICE } from '../../domain/services/hash.service.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';

import { TokenService } from './services/token.service';
import { HashService } from './services/hash.service';
import { PrismaUserRepository } from '../database/repositories/prisma-user.repository';

import { GoogleLoginUseCase } from '../../application/use-cases/auth/google-login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.use-case';
import { LogoutUseCase } from '../../application/use-cases/auth/logout.use-case';
import { CredentialsRegisterUseCase } from '../../application/use-cases/auth/credentials-register.use-case';
import { CredentialsLoginUseCase } from '../../application/use-cases/auth/credentials-login.use-case';

import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Strategies
    GoogleStrategy,
    JwtStrategy,
    JwtRefreshStrategy,

    // Infra Services
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
    {
      provide: HASH_SERVICE,
      useClass: HashService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    PrismaService,

    // Use Cases
    {
      provide: GoogleLoginUseCase,
      useFactory: (userRepo, tokenSvc, hashSvc) => new GoogleLoginUseCase(userRepo, tokenSvc, hashSvc),
      inject: [USER_REPOSITORY, TOKEN_SERVICE, HASH_SERVICE],
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (userRepo, tokenSvc, hashSvc) => new RefreshTokenUseCase(userRepo, tokenSvc, hashSvc),
      inject: [USER_REPOSITORY, TOKEN_SERVICE, HASH_SERVICE],
    },
    {
      provide: LogoutUseCase,
      useFactory: (userRepo) => new LogoutUseCase(userRepo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: CredentialsRegisterUseCase,
      useFactory: (userRepo, tokenSvc, hashSvc) => new CredentialsRegisterUseCase(userRepo, tokenSvc, hashSvc),
      inject: [USER_REPOSITORY, TOKEN_SERVICE, HASH_SERVICE],
    },
    {
      provide: CredentialsLoginUseCase,
      useFactory: (userRepo, tokenSvc, hashSvc) => new CredentialsLoginUseCase(userRepo, tokenSvc, hashSvc),
      inject: [USER_REPOSITORY, TOKEN_SERVICE, HASH_SERVICE],
    },
  ],
})
export class AuthModule {}
