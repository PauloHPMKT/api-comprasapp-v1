import { Module, Provider } from '@nestjs/common';
import { makeUseCaseProviders } from '../domain/providers/usecase.provider';

const providers: Provider[] = [...makeUseCaseProviders()];

@Module({
  controllers: [],
  providers,
  exports: providers,
})
export class AccountModule {}
