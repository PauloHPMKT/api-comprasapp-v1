import { Module, Provider } from '@nestjs/common';
import { UserModule } from '@/modules/user/presentation/user.module';
import { AccountModule } from '@/modules/account/presentation/account.module';
import { CategoriesModule } from '@/modules/categories/presentation/categories.module';
import { makeUseCasesProviders } from './domain/providers/usecases';
import { SignupController } from './presentation/controllers/signup.controller';

const providers: Provider[] = [...makeUseCasesProviders()];

@Module({
  imports: [UserModule, AccountModule, CategoriesModule],
  controllers: [SignupController],
  providers,
})
export class SignupModule {}
