import { TokenPayloadModel } from '../../domain/models/token-payload';

export interface ValidateUserCredentials {
  validate({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): Promise<TokenPayloadModel.Params>;
}
