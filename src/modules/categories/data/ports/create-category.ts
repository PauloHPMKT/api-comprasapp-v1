import { ToRepositoryModel } from '../models/to-repository';

export interface CreateCategoryRepositoryPort {
  create: (
    data: ToRepositoryModel.Category,
  ) => Promise<ToRepositoryModel.Result>;
}
