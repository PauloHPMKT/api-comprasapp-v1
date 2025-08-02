import { Provider } from '@nestjs/common';
import { MongoAccountRepository } from '../repository/mongo-account.repository';

export const makeAccountRepositoryProviders = (): Provider[] => [
  {
    provide: 'IsActiveAccountRepositoryPort',
    useClass: MongoAccountRepository,
  },
  {
    provide: 'CreateAccountRepositoryPort',
    useClass: MongoAccountRepository,
  },
];
