import { Provider } from '@nestjs/common';
import { CreateDefaultCategoriesUseCase } from '../../data/usecases/create-default-categories';

export const makeUseCaseCategoriesProviders = (): Provider[] => [
  {
    provide: 'CREATE_DEFAULT_CATEGORIES_PORT',
    useClass: CreateDefaultCategoriesUseCase,
  },
];
