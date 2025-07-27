import { CreateUserRepositoryModel } from '../../data/models/user-repository.model';
import { CreateUserRepositoryPort } from '../../data/ports/create-user.repository';
import { IsExistsUserRepositoryPort } from '../../data/ports/is-exists-user.repository';

export class MongoUserRepository
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
    return { id: userData.id, email: userData.email };
  }
}
