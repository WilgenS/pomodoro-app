import { IUserRepository } from '../../../domain/repositories/user.repository.interface';

export class LogoutUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user) {
      user.updateRefreshToken(null);
      await this.userRepository.save(user);
    }
  }
}
