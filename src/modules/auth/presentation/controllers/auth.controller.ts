import { Controller, Post, Req } from '@nestjs/common';
import { AuthModel } from '../../domain/models/auth';
import { MissingParamError } from '@/shared/errors';
import { badRequest } from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { BaseController } from '@/shared/presentation/protocols/Controller';

@Controller('auth')
export class AuthController extends BaseController<AuthModel.Signin> {
  @Post()
  async handle(
    @Req() request: HttpRequest<AuthModel.Signin>,
  ): Promise<HttpResponse<AuthModel.SigninResult | string>> {
    const requiredFields = ['email', 'password'];

    const hasError = this.validateRequiredFields(request.body, requiredFields);
    if (hasError) return badRequest(new MissingParamError(hasError));
  }
}
