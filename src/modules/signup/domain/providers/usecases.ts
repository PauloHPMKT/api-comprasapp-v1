import { Provider } from '@nestjs/common';
import { AddAccount } from '../usecases/add-account';
import { SignupModel } from '../models/signup';

class AddSignupUseCase implements AddAccount {
  async execute(params: SignupModel.Params): Promise<string> {
    console.log(params);
    return 'valid_email@mail.com';
  }
}

export const makeUseCasesProviders = (): Provider[] => [
  {
    provide: 'AddAccount',
    useClass: AddSignupUseCase,
  },
];
