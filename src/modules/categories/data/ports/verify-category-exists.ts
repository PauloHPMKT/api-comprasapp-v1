export interface VerifyCategoryExistsRepository {
  verify(accountId: string, categoryName: string): Promise<boolean>;
}
