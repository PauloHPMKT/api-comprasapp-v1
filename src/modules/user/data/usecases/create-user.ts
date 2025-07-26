import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserModel,
  CreateUserPort,
} from '../../domain/ports/create-user-port';
import { IsExistsUserRepositoryPort } from '../ports/is-exists-user.repository';
import { UserAlreadyExistsError } from '@/shared/errors';
import { User } from '../../domain/entities/User';
import { CreateUserRepositoryPort } from '../ports/create-user.repository';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(
    @Inject('IsExistsUserRepositoryPort')
    private readonly isExistsUserRepositoryPort: IsExistsUserRepositoryPort,
    @Inject('CreateUserRepositoryPort')
    private readonly createUserRepositoryPort: CreateUserRepositoryPort,
  ) {}

  async execute(
    params: CreateUserModel.Params,
  ): Promise<CreateUserModel.Result> {
    const isUser = await this.isExistsUserRepositoryPort.exists(params.email);
    if (isUser) {
      throw new UserAlreadyExistsError();
    }

    const user = new User({
      name: params.name,
      email: params.email,
    }).toJSON();

    await this.createUserRepositoryPort.create({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });

    return {
      email: 'valid_email@mail.com',
      id: 'valid_id',
    };
  }
}
