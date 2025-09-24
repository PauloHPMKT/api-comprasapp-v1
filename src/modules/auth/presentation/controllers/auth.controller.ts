import { MissingParamError } from '@/shared/errors';
import { badRequest } from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import { Controller, Post, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController extends BaseController<any, any> {
  @Post()
  async handle(@Req() request: HttpRequest<any>): Promise<HttpResponse<any>> {
    const requiredFields = ['email'];

    const hasError = this.validateRequiredFields(request.body, requiredFields);
    if (hasError) return badRequest(new MissingParamError(hasError));
  }
}
