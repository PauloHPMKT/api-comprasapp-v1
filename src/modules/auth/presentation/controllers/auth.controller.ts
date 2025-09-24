import { Controller, Inject, Post, Req } from '@nestjs/common';
import { AuthModel } from '../../domain/models/auth';
import { SigninPort } from '../../domain/usecases/signin';
import { MissingParamError } from '@/shared/errors';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import {
  badRequest,
  serverError,
  ok,
} from '@/shared/presentation/helpers/http-response';

@Controller('auth')
export class AuthController extends BaseController<AuthModel.Signin> {
  constructor(
    @Inject('SIGNIN_PORT')
    private readonly signin: SigninPort,
  ) {
    super();
  }

  @Post()
  async handle(
    @Req() request: HttpRequest<AuthModel.Signin>,
  ): Promise<HttpResponse<AuthModel.SigninResult | string>> {
    try {
      const requiredFields = ['email', 'password'];

      const hasError = this.validateRequiredFields(
        request.body,
        requiredFields,
      );
      if (hasError) return badRequest(new MissingParamError(hasError));

      const { email, password } = request.body;
      const response = await this.signin.execute({ email, password });

      return ok<AuthModel.SigninResult>(response);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
