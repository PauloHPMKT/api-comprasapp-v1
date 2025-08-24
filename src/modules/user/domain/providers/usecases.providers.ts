import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../../data/usecases/create-user';

export const makeUseCaseProviders = (): Provider[] => [
  {
    provide: 'CREATE_USER_PORT',
    useClass: CreateUserUseCase,
  },
];
