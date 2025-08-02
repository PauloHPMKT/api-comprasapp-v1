import { AddAccountModel } from '../models/create-account.model';

export interface CreateAccountPort {
  execute(params: AddAccountModel.Params): Promise<{ id: string }>;
}
