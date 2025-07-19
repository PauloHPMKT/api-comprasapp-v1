export interface IsExistsUserRepositoryPort {
  exists(email: string): Promise<boolean>;
}

// mock
export class UserRepository implements IsExistsUserRepositoryPort {
  async exists(email: string): Promise<boolean> {
    // Simulate a database check
    console.log(`Checking if user exists with email: ${email}`);
    return true;
  }
}
