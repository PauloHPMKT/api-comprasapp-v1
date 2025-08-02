import bcrypt from 'bcrypt';
import { EncrypterPort } from '../domain/ports/encrypter.port';

export class BcryptAdapter implements EncrypterPort {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, this.salt);
    return hashedPassword;
  }
}
