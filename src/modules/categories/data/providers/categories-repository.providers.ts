import { Provider } from '@nestjs/common';
import { MongoCategoriesRepository } from '../../infra/repository/mongo-category.repository';

class CreateCategoryRepository {}

export const makeCategoriesRepositoryProviders = (): Provider[] => [
  {
    provide: 'CREATE_DEFAULT_CATEGORIES_REPOSITORY_PORT',
    useClass: MongoCategoriesRepository,
  },
  {
    provide: 'VERIFY_CATEGORY_EXISTS_REPOSITORY_PORT',
    useValue: MongoCategoriesRepository,
  },
  {
    provide: 'CREATE_CATEGORY_REPOSITORY_PORT',
    useClass: CreateCategoryRepository,
  },
];
