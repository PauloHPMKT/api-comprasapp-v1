import { Global, Module, Provider } from '@nestjs/common';
import { makeDatabaseProviders } from './providers/database.provider';
import { EnvConfigModule } from '@/shared/env-config/env-config.module';
import { EnvConfigService } from '@/shared/env-config/env-config.service';

const providers: Provider[] = [...makeDatabaseProviders, EnvConfigService];

@Global()
@Module({
  imports: [EnvConfigModule],
  providers,
  exports: providers,
})
export class DatabaseModule {}
