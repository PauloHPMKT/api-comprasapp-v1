import { Provider } from '@nestjs/common';
import {
  CreateUserPort,
  CreateUserModel,
} from '../../domain/ports/create-user-port';

export class CreateUserUseCase implements CreateUserPort {
  async execute(params: CreateUserModel.Params): Promise<string> {
    console.log(params);
    return 'valid_email@mail.com';
  }
}

export const makeUseCaseProviders = (): Provider[] => [
  {
    provide: 'CreateUserPort',
    useClass: CreateUserUseCase,
  },
];
