import { Module, Provider } from '@nestjs/common';
import { makeUseCaseCategoriesProviders } from '../domain/providers/usecase.providers';

const providers: Provider[] = [...makeUseCaseCategoriesProviders()];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: ['CreateDefaultCategoriesPort'],
})
export class CategoriesModule {}
