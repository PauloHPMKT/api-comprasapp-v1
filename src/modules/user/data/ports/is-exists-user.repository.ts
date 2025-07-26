export interface IsExistsUserRepositoryPort {
  exists(email: string): Promise<boolean>;
}
