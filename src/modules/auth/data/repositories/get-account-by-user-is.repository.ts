import { TokenPayloadModel } from '../../domain/models/token-payload';

export interface getAccountByUserIdRepositoryPort {
  getAccount(userId: string): Promise<TokenPayloadModel.Params | null>;
}
