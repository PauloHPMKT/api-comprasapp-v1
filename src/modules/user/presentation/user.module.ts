import { Module, Provider } from '@nestjs/common';
import { makeUseCaseProviders } from '../domain/providers/usecases.providers';
import { makeUserRepositoryProviders } from '../infra/providers/user-repository.provider';

const providers: Provider[] = [
  ...makeUseCaseProviders(),
  ...makeUserRepositoryProviders(),
];

@Module({
  controllers: [],
  providers,
  exports: ['CreateUserPort'],
})
export class UserModule {}
