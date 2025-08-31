import { CreateCategoryModel } from '../models/create-category';

export interface CreateCategory {
  execute(
    data: CreateCategoryModel.Params,
  ): Promise<CreateCategoryModel.Result>;
}
