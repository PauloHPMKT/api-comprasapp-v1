import { Provider } from '@nestjs/common';
import { AddSignupUseCase } from '../../data/usecases/add-signup';

export const makeUseCasesProviders = (): Provider[] => [
  {
    provide: 'AddAccount',
    useClass: AddSignupUseCase,
  },
];
