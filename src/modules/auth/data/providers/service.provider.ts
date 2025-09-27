import { Provider } from '@nestjs/common';
import { ValidateUserCredentials } from '../protocols/validate-user-credentials';
import { TokenPayloadModel } from '../../domain/models/token-payload';

class ValidateService implements ValidateUserCredentials {
  async validate({ email, password }): Promise<TokenPayloadModel.Params> {
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
