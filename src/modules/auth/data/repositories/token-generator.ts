import { TokenPayloadModel } from '../../domain/models/token-payload';

export interface GenerateToken {
  generate(payload: TokenPayloadModel.Params): Promise<string>;
}
