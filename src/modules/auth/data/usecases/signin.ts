import { Inject } from '@nestjs/common';
import { AuthModel } from '../../domain/models/auth';
import { SigninPort } from '../../domain/usecases/signin';
import { ValidateUserCredentials } from '../protocols/validate-user-credentials';
import { FindUserIdByEmailRepository } from '../repositories/find-user-id-by-email.repository';

export class SigninUsecase implements SigninPort {
  constructor(
    @Inject('FIND_USER_ID_BY_EMAIL_REPOSITORY')
    private readonly findUserIdByEmailRepository: FindUserIdByEmailRepository,
    @Inject('VALIDATE_USER_CREDENTIALS')
    private readonly validateUserCredentials: ValidateUserCredentials,
  ) {}
  async execute(data: AuthModel.Signin): Promise<AuthModel.SigninResult> {
    const { email, password } = data;
    await this.findUserIdByEmailRepository.findByEmail(email);
    await this.validateUserCredentials.validate({ email, password });
    return {
      accessToken: 'valid_token',
    };
  }
}
