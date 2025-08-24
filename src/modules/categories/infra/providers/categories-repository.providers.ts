import { Provider } from '@nestjs/common';

class MongoCategoriesRepository {}

export const makeCategoriesRepositoryProviders = (): Provider[] => [
  {
    provide: 'CREATE_DEFAULT_CATEGORIES_REPOSITORY_PORT',
    useClass: MongoCategoriesRepository,
  },
];
