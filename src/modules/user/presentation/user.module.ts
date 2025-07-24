import { Module, Provider } from '@nestjs/common';
import { makeUseCaseProviders } from '../domain/providers/usecases.providers';
import { makeIsExistsUserProvider } from '../infra/providers/is-exists-user.provider';

const providers: Provider[] = [
  ...makeUseCaseProviders(),
  ...makeIsExistsUserProvider(),
];

@Module({
  controllers: [],
  providers,
  exports: ['CreateUserPort'],
})
export class UserModule {}
