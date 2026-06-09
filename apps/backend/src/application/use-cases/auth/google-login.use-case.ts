import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { IHashService } from '../../../domain/services/hash.service.interface';
import { ITokenService } from '../../../domain/services/token.service.interface';
import { GoogleAuthDto } from '../../dtos/auth/google-auth.dto';
import { AuthTokensDto } from '../../dtos/auth/auth-tokens.dto';
import { User } from '../../../domain/entities/user.entity';
import * as crypto from 'crypto';

export class GoogleLoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async execute(dto: GoogleAuthDto): Promise<AuthTokensDto> {
    let user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      user = new User(
        crypto.randomUUID(),
        dto.email,
        dto.name,
        'google',
        new Date(),
        dto.avatar,
      );
      user = await this.userRepository.save(user);
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    const hashedRefreshToken = await this.hashService.hash(refreshToken);
    user.updateRefreshToken(hashedRefreshToken);
    await this.userRepository.save(user);

    return new AuthTokensDto(accessToken, refreshToken);
  }
}
