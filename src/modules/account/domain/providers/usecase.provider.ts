import { Provider } from '@nestjs/common';

export class CreateAccountUseCase {}

export const makeUseCaseProviders = (): Provider[] => [
  {
    provide: 'CreateAccountPort',
    useValue: CreateAccountUseCase,
  },
];
