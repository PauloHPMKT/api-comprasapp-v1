import { Provider } from '@nestjs/common';

class MongoCategoriesRepository {}

export const makeCategoriesRepositoryProviders = (): Provider[] => [
  {
    provide: 'CreateDefaultCategoriesRepositoryPort',
    useClass: MongoCategoriesRepository,
  },
];
