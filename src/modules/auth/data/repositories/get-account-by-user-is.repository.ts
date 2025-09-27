import { TokenPayloadModel } from '../../domain/models/token-payload';

export interface GetAccountByUserIdRepositoryPort {
  getAccount(userId: string): Promise<TokenPayloadModel.Result | null>;
}
