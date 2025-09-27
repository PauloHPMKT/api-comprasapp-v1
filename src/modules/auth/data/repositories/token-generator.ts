import { ToJwtTokenPayloadModel } from '../models/token-payload';

export interface GenerateToken {
  generate(
    payload: ToJwtTokenPayloadModel.Params,
  ): Promise<{ accessToken: string }>;
}
