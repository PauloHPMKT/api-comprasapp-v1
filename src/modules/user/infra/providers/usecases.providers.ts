import { Provider } from '@nestjs/common';
import {
  CreateUserPort,
  CreateUserModel,
} from '../../domain/ports/create-user-port';

export class CreateUserUseCase implements CreateUserPort {
  async execute(
    params: CreateUserModel.Params,
  ): Promise<CreateUserModel.Result> {
    console.log(params);
    return {
      email: 'valid_email@mail.com',
      id: 'valid_id',
    };
  }
}

export const makeUseCaseProviders = (): Provider[] => [
  {
    provide: 'CreateUserPort',
    useClass: CreateUserUseCase,
  },
];
