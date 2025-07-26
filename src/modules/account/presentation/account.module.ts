import { Module, Provider } from '@nestjs/common';
import { makeUseCaseProviders } from '../domain/providers/usecase.provider';
import { makeAccountRepositoryProviders } from '../infra/providers/account-repository.providers';

const providers: Provider[] = [
  ...makeUseCaseProviders(),
  ...makeAccountRepositoryProviders(),
];

@Module({
  controllers: [],
  providers,
  exports: ['CreateAccountPort'],
})
export class AccountModule {}
