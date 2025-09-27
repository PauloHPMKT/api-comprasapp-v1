/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/signup.module';
import { EncrypterModule } from './modules/encrypter/presentation/encrypter.module';
import { DatabaseModule } from './modules/database/database.module';
import { EnvConfigModule } from './shared/env-config/env-config.module';
import { EnvConfigService } from './shared/env-config/env-config.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthTokenMiddleware } from './main/middlewares/auth-token-middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtTokenAdapter } from './modules/auth/infra/jwt/jwt-adapter';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    EncrypterModule,
    SignupModule,
    DatabaseModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EnvConfigService,
    {
      provide: 'TOKEN_DECRYPTER',
      useClass: JwtTokenAdapter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthTokenMiddleware)
      .exclude(
        { path: '/signup', method: RequestMethod.ALL },
        { path: '/auth', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
