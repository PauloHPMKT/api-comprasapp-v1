import { Provider } from '@nestjs/common';
import { MongoUserRepository } from '../repository/mongo-user.repository';

export const makeUserRepositoryProviders = (): Provider[] => [
  {
    provide: 'IsExistsUserRepositoryPort',
    useClass: MongoUserRepository,
  },
  {
    provide: 'CreateUserRepositoryPort',
    useClass: MongoUserRepository,
  },
];
