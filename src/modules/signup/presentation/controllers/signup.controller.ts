import { Body, Controller, Inject } from '@nestjs/common';
import { BaseController } from '../../../../shared/presentation/protocols/Controller';
import {
  HttpRequest,
  HttpResponse,
} from '../../../../shared/presentation/http';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';

@Controller('signup')
export class SignupController extends BaseController<SignupModel.Params> {
  constructor(
    @Inject('AddAccount')
    private readonly addAccount: AddAccount,
  ) {
    super();
  }

  async handle(
    @Body() request: HttpRequest<SignupModel.Params>,
  ): Promise<HttpResponse<string | Error>> {
    const requiredFields = [
      'name',
      'email',
      'password',
      'confirmationPassword',
    ];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param ${field}`),
        };
      }
    }

    const { name, email, password, confirmationPassword } = request.body;

    await this.addAccount.execute({
      name,
      email,
      password,
      confirmationPassword,
    });
  }
}
