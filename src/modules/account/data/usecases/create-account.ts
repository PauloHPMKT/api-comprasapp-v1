import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountPort } from '../../domain/ports/create-account.port';
import { IsActiveAccountRepositoryPort } from '../ports/is-active-account.repository';
import { AddAccountModel } from '../../domain/models/create-account.model';
import { Account } from '../../domain/entities/Account';

@Injectable()
export class CreateAccountUseCase implements CreateAccountPort {
  constructor(
    @Inject('IsAccountActivePort')
    private readonly isAccountActivePort: IsActiveAccountRepositoryPort,
  ) {}

  async execute(params: AddAccountModel.Params): Promise<void> {
    const isActive = await this.isAccountActivePort.checkAccountByStatus(
      params.userId,
    );

    if (!isActive) throw new Error('Account is not active');

    new Account({
      userId: params.userId,
      password: params.password,
    }).toJSON();
  }
}
