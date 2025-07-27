import { Provider } from '@nestjs/common';
import { IsActiveAccountRepositoryPort } from '../../data/ports/is-active-account.repository';
import { CreateAccountRepositoryPort } from '../../data/ports/create-account.repository';
import { CreateAccountRepositoryModel } from '../../data/models/create-account-repository.model';

export const makeAccountRepositoryProviders = (): Provider[] => [
  {
    provide: 'IsActiveAccountRepositoryPort',
    useClass: AccountRepository,
  },
  {
    provide: 'CreateAccountRepositoryPort',
    useClass: AccountRepository,
  },
];

export class AccountRepository
  implements IsActiveAccountRepositoryPort, CreateAccountRepositoryPort
{
  async checkAccountByStatus(userId: string): Promise<boolean> {
    console.log(`Checking account status for user: ${userId}`);
    return true;
  }

  async add(params: CreateAccountRepositoryModel.Params): Promise<void> {
    console.log(`Adding account with params: ${JSON.stringify(params)}`);
    // Logic to add the account would go here
  }
}
