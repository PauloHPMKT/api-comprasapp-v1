import { Module, Provider } from '@nestjs/common';
import { makeUseCaseCategoriesProviders } from './domain/providers/usecase.providers';
import { makeCategoriesRepositoryProviders } from './data/providers/categories-repository.providers';
import { CreateCategoryController } from './presentation/controllers/create-category.controller';

const providers: Provider[] = [
  ...makeCategoriesRepositoryProviders(),
  ...makeUseCaseCategoriesProviders(),
];

@Module({
  imports: [],
  controllers: [CreateCategoryController],
  providers,
  exports: ['CREATE_DEFAULT_CATEGORIES_PORT'],
})
export class CategoriesModule {}
