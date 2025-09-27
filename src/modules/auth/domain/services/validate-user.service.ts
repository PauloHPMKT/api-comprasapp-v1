import { Inject, Injectable } from '@nestjs/common';
import { ValidateUserCredentials } from '../../data/protocols/validate-user-credentials';
import { TokenPayloadModel } from '../models/token-payload';
import { getAccountByUserIdRepositoryPort } from '../../data/repositories/get-account-by-user-is.repository';

@Injectable()
export class ValidateUserService implements ValidateUserCredentials {
  constructor(
    @Inject('GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT')
    private readonly getAccountByUserIdRepository: getAccountByUserIdRepositoryPort,
  ) {}

  async validate({ id, password }): Promise<TokenPayloadModel.Params> {
    await this.getAccountByUserIdRepository.getAccount(id);

    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      avatar: null,
      accountId: 'valid_account_id',
      plan: 'free',
      createdAt: new Date('2025-09-27T01:56:39.666Z'),
    };
  }
}
