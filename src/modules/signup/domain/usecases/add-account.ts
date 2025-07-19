import { SignupModel } from '../models/signup';

export interface AddAccount {
  execute(params: SignupModel.Params): Promise<string>;
}
