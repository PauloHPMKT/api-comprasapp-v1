import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import {
  badRequest,
  serverError,
  unprocessableEntity,
} from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { MissingParamError } from '@/shared/presentation/errors/missing-param-error';
import { UserAlreadyExistsError } from '@/shared/presentation/errors/user-already-exists-error';

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
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'confirmationPassword',
      ];
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, confirmationPassword } = request.body;

      await this.addAccount.execute({
        name,
        email,
        password,
        confirmationPassword,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof UserAlreadyExistsError) {
        return unprocessableEntity(error);
      }
      return serverError();
    }
  }
}
