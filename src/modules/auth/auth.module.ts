import { Module, Provider } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { makeAuthUsecaseProviders } from './domain/providers/usecase.provider';

const providers: Provider[] = [...makeAuthUsecaseProviders()];

@Module({
  imports: [],
  controllers: [AuthController],
  providers,
  exports: [],
})
export class AuthModule {}
