import { Module, Provider } from '@nestjs/common';
import { SignupController } from './controllers/signup.controller';
import { makeUseCasesProviders } from '../domain/providers/usecases';
import { UserModule } from '@/modules/user/presentation/user.module';
import { AccountModule } from '@/modules/account/presentation/account.module';

const providers: Provider[] = [...makeUseCasesProviders()];
@Module({
  imports: [UserModule, AccountModule],
  controllers: [SignupController],
  providers,
})
export class SignupModule {}
