import { Inject, Injectable } from '@nestjs/common';
import { ValidateUserCredentials } from '../../data/protocols/validate-user-credentials';
import { TokenPayloadModel } from '../models/token-payload';
import { GetAccountByUserIdRepositoryPort } from '../../data/repositories/get-account-by-user-is.repository';
import { CompareIfPasswordIsValid } from '@/modules/encrypter/domain/ports/compare-if-password-is-valid';

@Injectable()
export class ValidateUserService implements ValidateUserCredentials {
  constructor(
    @Inject('GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT')
    private readonly getAccountByUserIdRepository: GetAccountByUserIdRepositoryPort,
    @Inject('COMPARE_IF_PASSWORD_IS_VALID')
    private readonly compareIfPasswordIsValid: CompareIfPasswordIsValid,
  ) {}

  async validate({ id, password }): Promise<TokenPayloadModel.Params | null> {
    const account = await this.getAccountByUserIdRepository.getAccount(id);
    if (!account) return null;

    const isValidPassword = await this.compareIfPasswordIsValid.compare(
      password,
      account.password,
    );

    if (!isValidPassword) throw new Error('Invalid credentials');
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      avatar: account.avatar,
      accountId: account.accountId,
      plan: account.plan,
      createdAt: account.createdAt,
    };
  }
}
