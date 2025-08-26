import { ToRepositoryModel } from '../models/to-repository';

export interface CreateDefaultCategoriesRepositoryPort {
  addCategories(data: ToRepositoryModel.Category[]): Promise<void>;
}
