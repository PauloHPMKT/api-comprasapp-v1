export interface FindUserIdByEmailRepositoryPort {
  findByEmail(email: string): Promise<{ id: string } | null>;
}
