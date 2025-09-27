import { Injectable } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenDecrypter } from '../../data/decode-token';
import { GenerateToken } from '../../data/repositories/token-generator';
import { ToJwtTokenPayloadModel } from '../../data/models/token-payload';
import { AccountTokenPayload } from './types/jwt.types';
import { EnvConfigService } from '@/shared/env-config/env-config.service';

@Injectable()
export class JwtTokenAdapter implements TokenDecrypter, GenerateToken {
  private readonly jwtSecret: string;
  constructor(private readonly envConfigService: EnvConfigService) {
    this.jwtSecret = this.envConfigService.getEnv('JWT_SECRET');
  }

  decrypt(token: string): JwtPayload | string {
    return jwt.verify(token, this.jwtSecret) as JwtPayload;
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
    const token = jwt.sign(tokenPayload, this.jwtSecret, {
      expiresIn: '30h',
    });
    return { accessToken: token };
  }
}
