import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';

export class AddSignupUseCase implements AddAccount {
  async execute(params: SignupModel.Params): Promise<string> {
    // ver se o usuario já existe
    // ver se a senha ta igual a confirmação

    // criar as instancias nas entidades User e Account
    console.log(params);
    return 'valid_email@mail.com';
  }
}
