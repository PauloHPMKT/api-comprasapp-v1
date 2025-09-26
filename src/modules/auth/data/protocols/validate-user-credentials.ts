export interface ValidateUserCredentials {
  validate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean>;
}
