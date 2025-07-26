import { CreateUserModel } from '../models/create-user.model';

export interface CreateUserPort {
  execute(params: CreateUserModel.Params): Promise<CreateUserModel.Result>;
}
