import { TokenPayloadModel } from '../../domain/models/token-payload';

export interface ValidateUserCredentials {
  validate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<TokenPayloadModel.Params>;
}
