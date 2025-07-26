export interface IsActiveAccountRepositoryPort {
  checkAccountByStatus(userId: string): Promise<boolean>;
}
