import { CreateAccountRepositoryModel } from '../models/create-account-repository.model';

export interface CreateAccountRepositoryPort {
  add: (params: CreateAccountRepositoryModel.Params) => Promise<void>;
}
