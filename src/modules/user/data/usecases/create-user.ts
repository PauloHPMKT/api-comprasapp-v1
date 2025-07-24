import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserModel,
  CreateUserPort,
} from '../../domain/ports/create-user-port';
import { IsExistsUserRepositoryPort } from '../ports/is-exists-user.repository';
import { UserAlreadyExistsError } from '@/shared/errors';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(
    @Inject('IsExistsUserRepositoryPort')
    private readonly isExistsUserRepositoryPort: IsExistsUserRepositoryPort,
  ) {}

  async execute(
    params: CreateUserModel.Params,
  ): Promise<CreateUserModel.Result> {
    const isUser = await this.isExistsUserRepositoryPort.exists(params.email);
    if (isUser) {
      throw new UserAlreadyExistsError();
    }
    // chama o caso de uso do usuario para criar o usuário
    // const isUserExists = await this.isExistsUserRepositoryPort.exists(
    //   params.email,
    // );
    // if (isUserExists) throw new UserAlreadyExistsError();
    return {
      email: 'valid_email@mail.com',
      id: 'valid_id',
    };
  }
}
