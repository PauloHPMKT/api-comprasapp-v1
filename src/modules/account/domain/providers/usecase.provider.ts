import { Provider } from '@nestjs/common';
import { CreateAccountUseCase } from '../../data/usecases/create-account';

export const makeUseCaseProviders = (): Provider[] => [
  {
    provide: 'CreateAccountPort',
    useClass: CreateAccountUseCase,
  },
];
