import bcrypt from 'bcrypt';
import { EncrypterPort } from '../domain/ports/encrypter.port';
import { CompareIfPasswordIsValid } from '../domain/ports/compare-if-password-is-valid';

export class BcryptAdapter implements EncrypterPort, CompareIfPasswordIsValid {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, this.salt);
    return hashedPassword;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hashedValue);
    return isValid;
  }
}
