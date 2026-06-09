export const HASH_SERVICE = Symbol('HASH_SERVICE');

export interface IHashService {
  hash(data: string): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
}
