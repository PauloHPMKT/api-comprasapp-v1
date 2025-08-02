import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountPort } from '../../domain/ports/create-account.port';
import { IsActiveAccountRepositoryPort } from '../ports/is-active-account.repository';
import { AddAccountModel } from '../../domain/models/create-account.model';
import { Account } from '../../domain/entities/Account';
import { CreateAccountRepositoryPort } from '../ports/create-account.repository';

@Injectable()
export class CreateAccountUseCase implements CreateAccountPort {
  constructor(
    @Inject('IsActiveAccountRepositoryPort')
    private readonly isAccountActivePort: IsActiveAccountRepositoryPort,
    @Inject('CreateAccountRepositoryPort')
    private readonly createAccountRepositoryPort: CreateAccountRepositoryPort,
  ) {}

  async execute(params: AddAccountModel.Params): Promise<void> {
    const isActive = await this.isAccountActivePort.checkAccountByStatus(
      params.userId,
    );

    if (isActive !== null && !isActive) {
      throw new Error('Account is not active');
    }

    const account = new Account({
      userId: params.userId,
      password: params.password,
    }).toJSON();

    await this.createAccountRepositoryPort.add({
      id: account.id,
      plan: account.plan,
      isActive: account.isActive,
      userId: account.userId,
      password: account.password,
      createdAt: account.createdAt,
    });
  }
}
