export interface VerifyCategoryExistsRepository {
  verify: (categoryName: string) => Promise<boolean>;
}
