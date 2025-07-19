import { Module, Provider } from '@nestjs/common';
import { makeIsExistsUserProvider } from '../infra/providers/is-exists-user.provider';

const providers: Provider[] = [...makeIsExistsUserProvider()];

@Module({
  controllers: [],
  providers,
  exports: providers,
})
export class UserModule {}
