import { Inject, Injectable } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { IsExistsUserRepositoryPort } from '@/modules/user/domain/ports/is-exists-user.repository';
import { UserAlreadyExistsError } from '@/shared/errors';

@Injectable()
export class AddSignupUseCase implements AddAccount {
  constructor(
    @Inject('IsExistsUserRepositoryPort')
    private readonly isExistsUserRepositoryPort: IsExistsUserRepositoryPort,
  ) {}

  async execute(params: SignupModel.Params): Promise<string> {
    console.log('Executing AddSignupUseCase with params:', params);
    const isUserExists = await this.isExistsUserRepositoryPort.exists(
      params.email,
    );
    if (isUserExists) throw new UserAlreadyExistsError();
    // ver se a senha ta igual a confirmação

    // criar as instancias nas entidades User e Account
    console.log(params);
    return 'valid_email@mail.com';
  }
}
