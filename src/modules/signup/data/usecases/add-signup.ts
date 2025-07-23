import { Inject, Injectable } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { IsExistsUserRepositoryPort } from '@/modules/user/domain/ports/is-exists-user.repository';
import { UserAlreadyExistsError } from '@/shared/errors';
import { EncrypterPort } from '@/modules/encrypter/domain/ports/encrypter.port';

@Injectable()
export class AddSignupUseCase implements AddAccount {
  constructor(
    @Inject('IsExistsUserRepositoryPort')
    private readonly isExistsUserRepositoryPort: IsExistsUserRepositoryPort,
    @Inject('EncrypterPort')
    private readonly encrypterPort: EncrypterPort,
  ) {}

  async execute(params: SignupModel.Params): Promise<string> {
    const isUserExists = await this.isExistsUserRepositoryPort.exists(
      params.email,
    );
    if (isUserExists) throw new UserAlreadyExistsError();

    if (params.password !== params.confirmationPassword) {
      throw new Error('Password and confirmation password do not match');
    }

    await this.encrypterPort.hash(params.password);

    console.log(params);
    return 'valid_email@mail.com';
  }
}
