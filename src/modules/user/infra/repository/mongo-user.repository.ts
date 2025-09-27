import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryModel } from '../../data/models/user-repository.model';
import { CreateUserRepositoryPort } from '../../data/ports/create-user.repository';
import { IsExistsUserRepositoryPort } from '../../data/ports/is-exists-user.repository';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { FindUserIdByEmailRepositoryPort } from '@/modules/auth/data/repositories/find-user-id-by-email.repository';

@Injectable()
export class MongoUserRepository
  implements
    IsExistsUserRepositoryPort,
    CreateUserRepositoryPort,
    FindUserIdByEmailRepositoryPort
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
    data: CreateUserRepositoryModel.Params,
  ): Promise<CreateUserRepositoryModel.Result> {
    const userCollection = MongoHelper.getCollection('users');
    const { insertedId } = await userCollection.insertOne({
      _id: MongoHelper.toObjectId(data.id),
      name: data.name,
      email: data.email,
      avatar: data.avatar ?? null,
      createdAt: data.createdAt,
    });
    const user = await userCollection.findOne(
      { _id: insertedId },
      { projection: { _id: 1, email: 1 } },
    );
    const { id, email } = MongoHelper.map(user);

    return { id, email };
  }

  async findByEmail(email: string): Promise<{ id: string } | null> {
    const usersCollection = MongoHelper.getCollection('users');
    const user = await usersCollection.findOne(
      { email },
      { projection: { _id: 1 } },
    );
    if (!user) return null;
    return MongoHelper.map(user).id;
  }
}
