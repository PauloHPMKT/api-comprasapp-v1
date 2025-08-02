import { Inject, Injectable } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { EncrypterPort } from '@/modules/encrypter/domain/ports/encrypter.port';
import { CreateUserPort } from '@/modules/user/domain/ports/create-user-port';
import { CreateAccountPort } from '@/modules/account/domain/ports/create-account.port';

@Injectable()
export class AddSignupUseCase implements AddAccount {
  constructor(
    @Inject('CreateUserPort')
    private readonly createUserPort: CreateUserPort,
    @Inject('EncrypterPort')
    private readonly encrypterPort: EncrypterPort,
    @Inject('CreateAccountPort')
    private readonly createAccountPort: CreateAccountPort,
  ) {}

  async execute(params: SignupModel.Params): Promise<string> {
    if (params.password !== params.confirmationPassword) {
      throw new Error('Password and confirmation password do not match');
    }

    const user = await this.createUserPort.execute({
      name: params.name,
      email: params.email,
    });

    const hashedPassword = await this.encrypterPort.hash(params.password);

    const { id } = await this.createAccountPort.execute({
      userId: user.id,
      password: hashedPassword,
    });

    console.log(`Account created with ID: ${id}`);

    return user.email;
  }
}
