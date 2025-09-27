import { Injectable } from '@nestjs/common';
import { ValidateUserCredentials } from '../../data/protocols/validate-user-credentials';
import { TokenPayloadModel } from '../models/token-payload';

@Injectable()
export class ValidateUserService implements ValidateUserCredentials {
  async validate({ email, password }): Promise<TokenPayloadModel.Params> {
    console.log(email, password);
    throw new Error('Method not implemented.');
  }
}
