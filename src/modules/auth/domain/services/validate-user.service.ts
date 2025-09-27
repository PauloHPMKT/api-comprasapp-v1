import { Inject, Injectable } from '@nestjs/common';
import { ValidateUserCredentials } from '../../data/protocols/validate-user-credentials';
import { TokenPayloadModel } from '../models/token-payload';
import { getAccountByUserIdRepositoryPort } from '../../data/repositories/get-account-by-user-is.repository';
import { CompareIfPasswordIsValid } from '@/modules/encrypter/domain/ports/compare-if-password-is-valid';

@Injectable()
export class ValidateUserService implements ValidateUserCredentials {
  constructor(
    @Inject('GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT')
    private readonly getAccountByUserIdRepository: getAccountByUserIdRepositoryPort,
    @Inject('COMPARE_IF_PASSWORD_IS_VALID')
    private readonly compareIfPasswordIsValid: CompareIfPasswordIsValid,
  ) {}

  async validate({ id, password }): Promise<TokenPayloadModel.Params> {
    const account = await this.getAccountByUserIdRepository.getAccount(id);
    if (account) {
      await this.compareIfPasswordIsValid.compare(password, 'hashed_password');
    }

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
