import { Module, Provider } from '@nestjs/common';
import { makeUseCaseProviders } from '../domain/providers/usecases.providers';
import { makeUserRepositoryProviders } from '../infra/providers/user-repository.provider';
import { AuthModule } from '@/modules/auth/auth.module';

const providers: Provider[] = [
  ...makeUseCaseProviders(),
  ...makeUserRepositoryProviders(),
];

@Module({
  imports: [AuthModule],
  controllers: [],
  providers,
  exports: ['CREATE_USER_PORT'],
})
export class UserModule {}
