import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.mapToDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.mapToDomain(user) : null;
  }

  async save(user: User): Promise<User> {
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
      avatar: user.avatar,
      refreshToken: user.refreshToken,
      createdAt: user.createdAt,
    };

    const savedUser = await this.prisma.user.upsert({
      where: { id: user.id },
      create: data,
      update: data,
    });
    return this.mapToDomain(savedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  private mapToDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.provider,
      prismaUser.createdAt,
      prismaUser.avatar,
      prismaUser.refreshToken,
    );
  }
}
