import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';
import { CreateAccountRepositoryModel } from '../../data/models/create-account-repository.model';
import { CreateAccountRepositoryPort } from '../../data/ports/create-account.repository';
import { IsActiveAccountRepositoryPort } from '../../data/ports/is-active-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoAccountRepository
  implements IsActiveAccountRepositoryPort, CreateAccountRepositoryPort
{
  async checkAccountByStatus(userId: string): Promise<boolean | null> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const user = await accountCollection.findOne(
      { userId },
      { projection: { _id: 1, isActive: 1 } },
    );
    return user ? user.isActive : null;
  }

  async add(params: CreateAccountRepositoryModel.Params): Promise<void> {
    console.log(`Adding account with params: ${JSON.stringify(params)}`);
    // Logic to add the account would go here
  }
}
