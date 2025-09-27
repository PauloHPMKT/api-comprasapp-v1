export interface FindUserIdByEmailRepository {
  findByEmail(email: string): Promise<string>;
}
