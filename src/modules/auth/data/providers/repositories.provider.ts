import { Provider } from '@nestjs/common';
import { MongoUserRepository } from '@/modules/user/infra/repository/mongo-user.repository';
import { MongoAccountRepository } from '@/modules/account/infra/repository/mongo-account.repository';
import { JwtTokenAdapter } from '../../infra/jwt/jwt-adapter';

export const makeRepositoriesProvider = (): Provider[] => [
  {
    provide: 'FIND_USER_ID_BY_EMAIL_REPOSITORY_PORT',
    useClass: MongoUserRepository,
  },
  {
    provide: 'GENERATE_TOKEN_PORT',
    useClass: JwtTokenAdapter,
  },
  {
    provide: 'GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT',
    useClass: MongoAccountRepository,
  },
];
