import { Provider } from '@nestjs/common';
import { BcryptAdapter } from '../../adapters/bcrypt.adapter';

const salt = 12;

export const makeEncrypterProvider = (): Provider[] => [
  {
    provide: 'ENCRYPTER_PORT',
    useValue: new BcryptAdapter(salt),
  },
];
