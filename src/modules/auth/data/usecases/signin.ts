import { Inject } from '@nestjs/common';
import { AuthModel } from '../../domain/models/auth';
import { SigninPort } from '../../domain/usecases/signin';
import { ValidateUserCredentials } from '../protocols/validate-user-credentials';
import { FindUserIdByEmailRepositoryPort } from '../repositories/find-user-id-by-email.repository';
import { GenerateToken } from '../repositories/token-generator';

export class SigninUsecase implements SigninPort {
  constructor(
    @Inject('FIND_USER_ID_BY_EMAIL_REPOSITORY_PORT')
    private readonly findUserIdByEmailRepository: FindUserIdByEmailRepositoryPort,
    @Inject('VALIDATE_USER_CREDENTIALS')
    private readonly validateUserCredentials: ValidateUserCredentials,
    @Inject('GENERATE_TOKEN_PORT')
    private readonly generateToken: GenerateToken,
  ) {}

  async execute(data: AuthModel.Signin): Promise<AuthModel.SigninResult> {
    const { email, password } = data;
    const user = await this.findUserIdByEmailRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const payload = await this.validateUserCredentials.validate({
      id: user.id,
      password,
    });

    const { accessToken } = await this.generateToken.generate(payload);
    return {
      accessToken,
    };
  }
}
