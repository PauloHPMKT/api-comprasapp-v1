import { Provider } from '@nestjs/common';
import { ValidateUserService } from '../../domain/services/validate-user.service';
import { BcryptAdapter } from '@/modules/encrypter/adapters/bcrypt.adapter';

export const makeServiceProvider = (): Provider[] => [
  {
    provide: 'VALIDATE_USER_CREDENTIALS',
    useClass: ValidateUserService,
  },
  {
    provide: 'COMPARE_IF_PASSWORD_IS_VALID',
    useClass: BcryptAdapter,
  },
];
