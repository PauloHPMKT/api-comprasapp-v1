import { Provider } from '@nestjs/common';
import { SigninPort } from '../usecases/signin';
import { AuthModel } from '../models/auth';

class SigninUsecase implements SigninPort {
  async execute(data: AuthModel.Signin): Promise<AuthModel.SigninResult> {
    console.log(data);
    throw new Error('Method not implemented.');
  }
}

export const makeAuthUsecaseProviders = (): Provider[] => [
  {
    provide: 'SIGNIN_PORT',
    useClass: SigninUsecase,
  },
];
