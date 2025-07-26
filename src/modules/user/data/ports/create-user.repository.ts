import { CreateUserRepositoryModel } from '../models/user-repository.model';

export interface CreateUserRepositoryPort {
  create(
    params: CreateUserRepositoryModel.Params,
  ): Promise<CreateUserRepositoryModel.Result>;
}
