export interface CreateDefaultCategoriesPort {
  execute(accountId: string): Promise<void>;
}
