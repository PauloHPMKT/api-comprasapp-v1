import { CreateDefaultCategoriesPort } from '../../domain/ports/create-default-categories.port';

export class CreateDefaultCategoriesUseCase
  implements CreateDefaultCategoriesPort
{
  async execute(accountId: string): Promise<void> {
    if (!accountId) {
      throw new Error('Account ID is required');
    }
  }
}
