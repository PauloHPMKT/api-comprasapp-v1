import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import { badRequest } from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';

@Controller('signup')
export class SignupController extends BaseController<SignupModel.Params> {
  constructor(
    @Inject('AddAccount')
    private readonly addAccount: AddAccount,
  ) {
    super();
  }

  @Post()
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
        return badRequest(new Error(`Missing param ${field}`));
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
