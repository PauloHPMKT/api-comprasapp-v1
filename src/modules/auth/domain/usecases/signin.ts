import { AuthModel } from '../models/auth';

export interface SigninPort {
  execute(data: AuthModel.Signin): Promise<AuthModel.SigninResult>;
}
