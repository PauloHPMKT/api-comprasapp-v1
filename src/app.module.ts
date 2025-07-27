import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/presentation/signup.module';
import { EncrypterModule } from './modules/encrypter/presentation/encrypter.module';
import { DatabaseModule } from './modules/database/presentation/database.module';

@Module({
  imports: [EncrypterModule, SignupModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
