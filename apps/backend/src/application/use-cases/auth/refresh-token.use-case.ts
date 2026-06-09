import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { IHashService } from '../../../domain/services/hash.service.interface';
import { ITokenService } from '../../../domain/services/token.service.interface';
import { AuthTokensDto } from '../../dtos/auth/auth-tokens.dto';
import { DomainException } from '../../../domain/exceptions/domain.exception';

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async execute(userId: string, refreshToken: string): Promise<AuthTokensDto> {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.refreshToken) {
      throw new DomainException('Access Denied');
    }

    const isRefreshTokenValid = await this.hashService.compare(refreshToken, user.refreshToken);
    if (!isRefreshTokenValid) {
      throw new DomainException('Access Denied');
    }

    const payload = { sub: user.id, email: user.email };
    const newAccessToken = this.tokenService.generateAccessToken(payload);
    const newRefreshToken = this.tokenService.generateRefreshToken(payload);

    const hashedRefreshToken = await this.hashService.hash(newRefreshToken);
    user.updateRefreshToken(hashedRefreshToken);
    await this.userRepository.save(user);

    return new AuthTokensDto(newAccessToken, newRefreshToken);
  }
}
