import { Provider } from '@nestjs/common';
import { ValidateUserService } from '../../domain/services/validate-user.service';

export const makeServiceProvider = (): Provider[] => [
  {
    provide: 'VALIDATE_USER_CREDENTIALS',
    useClass: ValidateUserService,
  },
];
