export interface FindUserIdByEmailRepositoryPort {
  findByEmail(email: string): Promise<string | null>;
}
