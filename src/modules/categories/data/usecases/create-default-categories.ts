import { Inject } from '@nestjs/common';
import { CreateDefaultCategoriesPort } from '../../domain/ports/create-default-categories.port';
import { CreateDefaultCategoriesRepositoryPort } from '../ports/create-default-categories.repository';

export class CreateDefaultCategoriesUseCase
  implements CreateDefaultCategoriesPort
{
  constructor(
    @Inject('CreateDefaultCategoriesRepositoryPort')
    private readonly createDefaultCategoriesRepositoryPort: CreateDefaultCategoriesRepositoryPort,
  ) {}

  async execute(accountId: string): Promise<void> {
    if (!accountId) {
      throw new Error('Account ID is required');
    }

    const categories = [
      { name: 'Hortifrutti', emoji: '🥦' },
      { name: 'Mercearia', emoji: '🛒' },
      { name: 'Limpeza', emoji: '🧽' },
      { name: 'Higiene', emoji: '🧼' },
      { name: 'Bebidas', emoji: '🍹' },
      { name: 'Padaria', emoji: '🍞' },
      { name: 'Carnes', emoji: '🥩' },
      { name: 'Outros', emoji: '❓' },
    ];

    await this.createDefaultCategoriesRepositoryPort.create(
      categories.map((category) => ({
        ...category,
        accountId,
        createdAt: new Date(),
      })),
    );
  }
}
