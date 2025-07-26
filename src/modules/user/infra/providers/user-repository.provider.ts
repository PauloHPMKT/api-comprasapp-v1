import { Provider } from '@nestjs/common';
import { IsExistsUserRepositoryPort } from '../../data/ports/is-exists-user.repository';
import { CreateUserRepositoryPort } from '../../data/ports/create-user.repository';
import { CreateUserRepositoryModel } from '../../data/models/user-repository.model';

export class UserRepository
  implements IsExistsUserRepositoryPort, CreateUserRepositoryPort
{
  async exists(email: string): Promise<boolean> {
    // Simulate a database check
    console.log(`Checking if user exists with email: ${email}`);
    return false;
  }

  async create(
    userData: CreateUserRepositoryModel.Params,
  ): Promise<CreateUserRepositoryModel.Result> {
    // Simulate user creation
    console.log(`Creating user with data: ${JSON.stringify(userData)}`);
    return { id: '123', ...userData };
  }
}

export const makeUserRepositoryProviders = (): Provider[] => [
  {
    provide: 'IsExistsUserRepositoryPort',
    useClass: UserRepository,
  },
  {
    provide: 'CreateUserPort',
    useClass: UserRepository,
  },
];
