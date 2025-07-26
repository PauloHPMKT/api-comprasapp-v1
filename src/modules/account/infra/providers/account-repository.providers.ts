import { Provider } from '@nestjs/common';

export const makeAccountRepositoryProviders = (): Provider[] => [
  {
    provide: 'IsAccountActivePort',
    useClass: AccountRepository,
  },
];

export class AccountRepository {
  async checkAccountByStatus(userId: string): Promise<boolean> {
    console.log(`Checking account status for user: ${userId}`);
    return true;
  }
}
