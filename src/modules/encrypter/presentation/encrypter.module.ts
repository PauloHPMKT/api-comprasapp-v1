import { Global, Module, Provider } from '@nestjs/common';
import { makeEncrypterProvider } from '../domain/providers/encrypter.provider';

const providers: Provider[] = [...makeEncrypterProvider()];

@Global()
@Module({
  providers,
  exports: providers,
})
export class EncrypterModule {}
