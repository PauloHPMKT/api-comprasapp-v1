import { Inject } from '@nestjs/common';
import { CreateDefaultCategoriesPort } from '../../domain/ports/create-default-categories.port';
import { CreateDefaultCategoriesRepositoryPort } from '../ports/create-default-categories.repository';
import { Category } from '../../domain/entities/Category';

export class CreateDefaultCategoriesUseCase
  implements CreateDefaultCategoriesPort
{
  constructor(
    @Inject('CREATE_DEFAULT_CATEGORIES_REPOSITORY_PORT')
    private readonly createDefaultCategoriesRepositoryPort: CreateDefaultCategoriesRepositoryPort,
  ) {}

  async execute(accountId: string): Promise<void> {
    if (!accountId) {
      throw new Error('Account ID é obrigatório');
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

    const categoriesMapped = categories.map((category) =>
      new Category({
        accountId,
        name: category.name,
        emoji: category.emoji,
      }).toJSON(),
    );

    await this.createDefaultCategoriesRepositoryPort.create(categoriesMapped);
  }
}
