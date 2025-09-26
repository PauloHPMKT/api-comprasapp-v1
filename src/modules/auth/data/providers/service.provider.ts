import { Provider } from '@nestjs/common';
import { ValidateUserCredentials } from '../protocols/validate-user-credentials';

class ValidateService implements ValidateUserCredentials {
  async validate({ email, password }): Promise<boolean> {
    console.log(email, password);
    throw new Error('Method not implemented.');
  }
}

export const makeServiceProvider = (): Provider[] => [
  {
    provide: 'VALIDATE_USER_CREDENTIALS',
    useClass: ValidateService,
  },
];
