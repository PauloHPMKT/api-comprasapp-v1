import { Body, Controller } from '@nestjs/common';
import { BaseController } from '../../../../shared/presentation/protocols/Controller';
import {
  HttpRequest,
  HttpResponse,
} from '../../../../shared/presentation/http';
import { SignupModel } from '../../domain/models/signup';

@Controller('signup')
export class SignupController extends BaseController<SignupModel.Params> {
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
  }
}
