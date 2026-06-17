import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { IHashService } from '../../../domain/services/hash.service.interface';
import { ITokenService } from '../../../domain/services/token.service.interface';
import { AuthTokensDto } from '../../dtos/auth/auth-tokens.dto';
import { User } from '../../../domain/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export class CredentialsRegisterDto {
  email!: string;
  name!: string;
  avatar?: string;
}

export class CredentialsRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async execute(dto: CredentialsRegisterDto): Promise<AuthTokensDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    let user = new User(
      crypto.randomUUID(),
      dto.email,
      dto.name,
      'local',
      new Date(),
      dto.avatar,
    );

    user = await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    const hashedRefreshToken = await this.hashService.hash(refreshToken);
    user.updateRefreshToken(hashedRefreshToken);
    await this.userRepository.save(user);

    return new AuthTokensDto(accessToken, refreshToken);
  }
}
