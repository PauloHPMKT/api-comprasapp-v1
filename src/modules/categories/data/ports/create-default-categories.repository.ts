export interface CreateDefaultCategoriesRepositoryPort {
  create(
    categories: {
      name: string;
      emoji: string;
      accountId: string;
      createdAt: Date;
    }[],
  ): Promise<void>;
}
