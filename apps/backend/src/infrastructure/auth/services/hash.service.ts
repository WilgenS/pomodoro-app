import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IHashService } from '../../../domain/services/hash.service.interface';

@Injectable()
export class HashService implements IHashService {
  private readonly saltRounds = 10;

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
