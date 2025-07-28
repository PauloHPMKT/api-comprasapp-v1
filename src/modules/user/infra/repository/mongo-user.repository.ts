import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryModel } from '../../data/models/user-repository.model';
import { CreateUserRepositoryPort } from '../../data/ports/create-user.repository';
import { IsExistsUserRepositoryPort } from '../../data/ports/is-exists-user.repository';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';

@Injectable()
export class MongoUserRepository
  implements IsExistsUserRepositoryPort, CreateUserRepositoryPort
{
  async exists(email: string): Promise<boolean> {
    const usersCollection = MongoHelper.getCollection('users');
    const user = await usersCollection.findOne(
      { email },
      { projection: { _id: 1 } },
    );
    return !!user;
  }

  async create(
    userData: CreateUserRepositoryModel.Params,
  ): Promise<CreateUserRepositoryModel.Result> {
    // Simulate user creation
    console.log(`Creating user with data: ${JSON.stringify(userData)}`);
    return { id: userData.id, email: userData.email };
  }
}
