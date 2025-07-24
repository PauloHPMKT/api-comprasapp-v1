import { Module, Provider } from '@nestjs/common';
import { makeUseCaseProviders } from '../infra/providers/usecases.providers';

const providers: Provider[] = [...makeUseCaseProviders()];

@Module({
  controllers: [],
  providers,
  exports: providers,
})
export class UserModule {}
