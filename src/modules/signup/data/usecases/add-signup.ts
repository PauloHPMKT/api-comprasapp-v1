import { Inject, Injectable } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { EncrypterPort } from '@/modules/encrypter/domain/ports/encrypter.port';
import { CreateUserPort } from '@/modules/user/domain/ports/create-user-port';

@Injectable()
export class AddSignupUseCase implements AddAccount {
  constructor(
    @Inject('CreateUserPort')
    private readonly createUserPort: CreateUserPort,
    @Inject('EncrypterPort')
    private readonly encrypterPort: EncrypterPort,
  ) {}

  async execute(params: SignupModel.Params): Promise<string> {
    if (params.password !== params.confirmationPassword) {
      throw new Error('Password and confirmation password do not match');
    }

    const { email, id } = await this.createUserPort.execute({
      name: params.name,
      email: params.email,
      password: params.password,
      confirmationPassword: params.confirmationPassword,
    });
    console.log(email, id);

    await this.encrypterPort.hash(params.password);

    console.log(params);
    return 'valid_email@mail.com';
  }
}
