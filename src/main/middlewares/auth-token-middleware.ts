import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface TokenDecrypter {
  decrypt(token: string): any;
}

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(
    @Inject('TOKEN_DECRYPTER')
    private readonly tokenDecrypter: TokenDecrypter,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedException('Token not provided');

    const token = authorization.split(' ')[1];
    try {
      const decoded = this.tokenDecrypter.decrypt(token);
      req['decoded'] = decoded;
      next();
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
