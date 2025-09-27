import { Module, Provider } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { makeAuthUsecaseProviders } from './domain/providers/usecase.provider';
import { makeServiceProvider } from './data/providers/service.provider';
import { makeRepositoriesProvider } from './data/providers/repositories.provider';
import { EncrypterModule } from '../encrypter/presentation/encrypter.module';

const providers: Provider[] = [
  ...makeAuthUsecaseProviders(),
  ...makeServiceProvider(),
  ...makeRepositoriesProvider(),
];

@Module({
  imports: [EncrypterModule],
  controllers: [AuthController],
  providers,
  exports: [
    'FIND_USER_ID_BY_EMAIL_REPOSITORY_PORT',
    'GET_ACCOUNT_BY_USER_ID_REPOSITORY_PORT',
  ],
})
export class AuthModule {}
