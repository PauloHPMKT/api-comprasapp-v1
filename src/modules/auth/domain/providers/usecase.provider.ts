import { Provider } from '@nestjs/common';
import { SigninUsecase } from '../../data/usecases/signin';

export const makeAuthUsecaseProviders = (): Provider[] => [
  {
    provide: 'SIGNIN_PORT',
    useClass: SigninUsecase,
  },
];
