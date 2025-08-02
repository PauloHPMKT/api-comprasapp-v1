import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/presentation/signup.module';
import { EncrypterModule } from './modules/encrypter/presentation/encrypter.module';
import { DatabaseModule } from './modules/database/presentation/database.module';
import { EnvConfigModule } from './shared/env-config/env-config.module';
import { EnvConfigService } from './shared/env-config/env-config.service';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    EncrypterModule,
    SignupModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvConfigService],
})
export class AppModule {}
