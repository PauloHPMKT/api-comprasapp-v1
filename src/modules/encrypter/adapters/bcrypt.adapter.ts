import { EncrypterPort } from '../domain/ports/encrypter.port';

export class BcryptAdapter implements EncrypterPort {
  async hash(value: string): Promise<string> {
    // Simulate hashing for the sake of this example
    return `hashed_${value}`;
  }
}
