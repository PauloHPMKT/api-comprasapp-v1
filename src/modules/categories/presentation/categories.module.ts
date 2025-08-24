import { Module, Provider } from '@nestjs/common';
import { makeUseCaseCategoriesProviders } from '../domain/providers/usecase.providers';
import { makeCategoriesRepositoryProviders } from '../infra/providers/categories-repository.providers';

const providers: Provider[] = [
  ...makeUseCaseCategoriesProviders(),
  ...makeCategoriesRepositoryProviders(),
];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: ['CREATE_DEFAULT_CATEGORIES_PORT'],
})
export class CategoriesModule {}
