import { Provider } from '@nestjs/common';

class BcryptAdapter {
  async hash(value: string): Promise<string> {
    return `hashed_${value}`;
  }
}

export const makeEncrypterProvider = (): Provider[] => [
  {
    provide: 'EncrypterPort',
    useClass: BcryptAdapter,
  },
];
