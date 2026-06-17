import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { IHashService } from '../../../domain/services/hash.service.interface';
import { ITokenService } from '../../../domain/services/token.service.interface';
import { AuthTokensDto } from '../../dtos/auth/auth-tokens.dto';
import { UnauthorizedException } from '@nestjs/common';

export class CredentialsLoginDto {
  email!: string;
}

export class CredentialsLoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async execute(dto: CredentialsLoginDto): Promise<AuthTokensDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email address');
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
