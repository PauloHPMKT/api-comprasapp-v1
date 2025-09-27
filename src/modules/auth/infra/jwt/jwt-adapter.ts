import { Injectable } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenDecrypter } from '../../data/decode-token';
import { GenerateToken } from '../../data/repositories/token-generator';
import { ToJwtTokenPayloadModel } from '../../data/models/token-payload';
import { AccountTokenPayload } from './types/jwt.types';

@Injectable()
export class JwtTokenAdapter implements TokenDecrypter, GenerateToken {
  decrypt(token: string): JwtPayload | string {
    return jwt.verify(token, 'C0MPR4S@PP_S3CR3TK3Y');
  }

  async generate(
    payload: ToJwtTokenPayloadModel.Params,
  ): Promise<{ accessToken: string }> {
    const tokenPayload: AccountTokenPayload = {
      sub: payload.id,
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar || null,
      userId: payload.userId,
      plan: payload.plan,
      createdAt: payload.createdAt,
    };
    const token = jwt.sign(tokenPayload, 'C0MPR4S@PP_S3CR3TK3Y', {
      expiresIn: '30h',
    });
    return { accessToken: token };
  }
}
