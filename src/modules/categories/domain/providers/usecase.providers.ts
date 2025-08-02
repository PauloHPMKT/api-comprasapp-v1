import { Provider } from '@nestjs/common';

class CreateDefaultCategoriesUseCase {}

export const makeUseCaseCategoriesProviders = (): Provider[] => [
  {
    provide: 'CreateDefaultCategoriesPort',
    useClass: CreateDefaultCategoriesUseCase,
  },
];
