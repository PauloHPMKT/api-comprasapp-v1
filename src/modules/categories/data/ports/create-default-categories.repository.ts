import { ToRepositoryModel } from '../models/to-repository';

export interface CreateDefaultCategoriesRepositoryPort {
  addCategories(categories: ToRepositoryModel.Category[]): Promise<void>;
}
