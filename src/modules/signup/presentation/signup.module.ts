import { Module, Provider } from '@nestjs/common';
import { SignupController } from './controllers/signup.controller';
import { makeUseCasesProviders } from '../domain/providers/usecases';

const providers: Provider[] = [...makeUseCasesProviders()];
@Module({
  imports: [],
  controllers: [SignupController],
  providers,
})
export class SignupModule {}
