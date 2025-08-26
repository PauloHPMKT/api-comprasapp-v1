import { Provider } from '@nestjs/common';
import { MongoCategoriesRepository } from '../repository/mongo-category.repository';

export const makeCategoriesRepositoryProviders = (): Provider[] => [
  {
    provide: 'CREATE_DEFAULT_CATEGORIES_REPOSITORY_PORT',
    useClass: MongoCategoriesRepository,
  },
];
