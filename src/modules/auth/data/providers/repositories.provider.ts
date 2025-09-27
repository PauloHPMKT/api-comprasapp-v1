import { Provider } from '@nestjs/common';
import { MongoUserRepository } from '@/modules/user/infra/repository/mongo-user.repository';

export const makeRepositoriesProvider = (): Provider[] => [
  {
    provide: 'FIND_USER_ID_BY_EMAIL_REPOSITORY',
    useClass: MongoUserRepository,
  },
];
