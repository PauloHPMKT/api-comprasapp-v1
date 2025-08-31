import { MissingParamError } from '@/shared/errors';
import { badRequest } from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import { Body, Controller, Post } from '@nestjs/common';

interface CreateCategoryDto {
  accountId: string;
  name: string;
  emoji: string;
}

@Controller('category')
export class CreateCategoryController extends BaseController<CreateCategoryDto> {
  @Post()
  async handle(
    @Body() request: HttpRequest<CreateCategoryDto>,
  ): Promise<HttpResponse<any | Error>> {
    const requiredFields = ['name', 'emoji'];

    const hasError = this.validateRequiredFields(request.body, requiredFields);
    if (hasError) return badRequest(new MissingParamError(hasError));
  }
}
