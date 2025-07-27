import { Global, Module, Provider } from '@nestjs/common';
import { makeDatabaseProviders } from '../provider/database.provider';

const providers: Provider[] = [...makeDatabaseProviders];

@Global()
@Module({
  providers,
  exports: providers,
})
export class DatabaseModule {}
