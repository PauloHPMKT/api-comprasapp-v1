/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAccountRepositoryModel } from '../../data/models/create-account-repository.model';
import { CreateAccountRepositoryPort } from '../../data/ports/create-account.repository';
import { IsActiveAccountRepositoryPort } from '../../data/ports/is-active-account.repository';
import { GetAccountByUserIdRepositoryPort } from '@/modules/auth/data/repositories/get-account-by-user-is.repository';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { TokenPayloadModel } from '@/modules/auth/domain/models/token-payload';

@Injectable()
export class MongoAccountRepository
  implements
    IsActiveAccountRepositoryPort,
    CreateAccountRepositoryPort,
    GetAccountByUserIdRepositoryPort
{
  async checkAccountByStatus(userId: string): Promise<boolean | null> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const user = await accountCollection.findOne(
      { userId },
      { projection: { _id: 1, isActive: 1 } },
    );
    return user ? user.isActive : null;
  }

  async add(
    params: CreateAccountRepositoryModel.Params,
  ): Promise<CreateAccountRepositoryModel.Result> {
    const userCollection = MongoHelper.getCollection('accounts');
    const { insertedId } = await userCollection.insertOne({
      _id: MongoHelper.toObjectId(params.id),
      plan: params.plan,
      isActive: params.isActive,
      userId: params.userId,
      password: params.password,
      createdAt: params.createdAt,
    });

    return {
      id: insertedId.toHexString(),
    };
  }

  async getAccount(userId: string): Promise<TokenPayloadModel.Result | null> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = accountCollection.aggregate<TokenPayloadModel.Result>([
      { $match: { userId: MongoHelper.toObjectId(userId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$user.name',
          email: '$user.email',
          avatar: '$user.avatar',
          userId: '$user._id',
          plan: '$plan',
          password: '$password',
          createdAt: '$createdAt',
        },
      },
    ]);

    return (await account.hasNext()) ? await account.next() : null;
  }
}
