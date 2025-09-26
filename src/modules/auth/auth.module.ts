import { Module, Provider } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { makeAuthUsecaseProviders } from './domain/providers/usecase.provider';
import { makeServiceProvider } from './data/providers/service.provider';

const providers: Provider[] = [
  ...makeAuthUsecaseProviders(),
  ...makeServiceProvider(),
];

@Module({
  imports: [],
  controllers: [AuthController],
  providers,
  exports: [],
})
export class AuthModule {}
