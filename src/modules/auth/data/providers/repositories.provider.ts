import { Provider } from '@nestjs/common';
import { MongoUserRepository } from '@/modules/user/infra/repository/mongo-user.repository';
import { GenerateToken } from '../repositories/token-generator';
import { TokenPayloadModel } from '../../domain/models/token-payload';

class JwtAdapter implements GenerateToken {
  async generate(
    payload: TokenPayloadModel.Params,
  ): Promise<{ accessToken: string }> {
    console.log(payload);
    return { accessToken: 'valid_token' };
  }
}

export const makeRepositoriesProvider = (): Provider[] => [
  {
    provide: 'FIND_USER_ID_BY_EMAIL_REPOSITORY_PORT',
    useClass: MongoUserRepository,
  },
  {
    provide: 'GENERATE_TOKEN_PORT',
    useClass: JwtAdapter,
  },
];
