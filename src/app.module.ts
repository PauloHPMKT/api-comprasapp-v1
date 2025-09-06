import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/signup.module';
import { EncrypterModule } from './modules/encrypter/presentation/encrypter.module';
import { DatabaseModule } from './modules/database/presentation/database.module';
import { EnvConfigModule } from './shared/env-config/env-config.module';
import { EnvConfigService } from './shared/env-config/env-config.service';
import { CategoriesModule } from './modules/categories/categories.module';
import {
  AuthTokenMiddleware,
  TokenDecrypter,
} from './main/middlewares/auth-token-middleware';

class TokenDecrypterAdapter implements TokenDecrypter {
  decrypt(token: string): any {
    console.log('Decrypting token:', token);
    return { userId: 'decodedUserId' };
  }
}

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    EncrypterModule,
    SignupModule,
    DatabaseModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EnvConfigService,
    {
      provide: 'TOKEN_DECRYPTER',
      useClass: TokenDecrypterAdapter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthTokenMiddleware)
      .exclude({ path: '/signup', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
