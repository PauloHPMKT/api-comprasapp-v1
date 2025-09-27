export interface CompareIfPasswordIsValid {
  compare(inputPassword: string, hashedPassword: string): Promise<boolean>;
}
