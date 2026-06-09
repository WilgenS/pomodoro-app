import { GoogleLoginUseCase } from './google-login.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { ITokenService } from '../../../domain/services/token.service.interface';
import { IHashService } from '../../../domain/services/hash.service.interface';
import { User } from '../../../domain/entities/user.entity';

describe('GoogleLoginUseCase', () => {
  let useCase: GoogleLoginUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let tokenService: jest.Mocked<ITokenService>;
  let hashService: jest.Mocked<IHashService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };
    tokenService = {
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
      verifyRefreshToken: jest.fn(),
    };
    hashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    useCase = new GoogleLoginUseCase(userRepository, tokenService, hashService);
  });

  it('should create a new user and return tokens if user does not exist', async () => {
    const googleDto = {
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'avatar-url',
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockImplementation(async (user) => user);
    tokenService.generateAccessToken.mockReturnValue('at');
    tokenService.generateRefreshToken.mockReturnValue('rt');
    hashService.hash.mockResolvedValue('hashed-rt');

    const result = await useCase.execute(googleDto);

    expect(result.accessToken).toBe('at');
    expect(result.refreshToken).toBe('rt');
    expect(userRepository.save).toHaveBeenCalledTimes(2); // One for creation, one for refresh token
  });

  it('should return tokens for existing user', async () => {
    const existingUser = new User('user-1', 'test@example.com', 'Test User', 'google', new Date(), 'avatar-url');
    userRepository.findByEmail.mockResolvedValue(existingUser);
    userRepository.save.mockImplementation(async (user) => user);
    tokenService.generateAccessToken.mockReturnValue('at');
    tokenService.generateRefreshToken.mockReturnValue('rt');
    hashService.hash.mockResolvedValue('hashed-rt');

    const result = await useCase.execute({
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'avatar-url',
    });

    expect(result.accessToken).toBe('at');
    expect(result.refreshToken).toBe('rt');
    expect(userRepository.save).toHaveBeenCalled();
  });
});
