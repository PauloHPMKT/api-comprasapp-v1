import { MissingParamError } from '@/shared/errors';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import { Controller, Inject, Post, Req } from '@nestjs/common';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { CreateCategory } from '../../domain/ports/create-category';
import {
  badRequest,
  created,
  serverError,
} from '@/shared/presentation/helpers/http-response';

@Controller('category')
export class CreateCategoryController extends BaseController<
  CreateCategoryModel.Params,
  CreateCategoryModel.Result | string
> {
  constructor(
    @Inject('CREATE_CATEGORY_PORT')
    private readonly createCategory: CreateCategory,
  ) {
    super();
  }

  @Post()
  async handle(
    @Req() request: HttpRequest<CreateCategoryModel.Params>,
  ): Promise<HttpResponse<CreateCategoryModel.Result | string>> {
    try {
      const requiredFields = ['name', 'emoji'];

      const hasError = this.validateRequiredFields(
        request.body,
        requiredFields,
      );
      if (hasError) return badRequest(new MissingParamError(hasError));

      const { accountId, name, emoji } = request.body;
      const category = await this.createCategory.execute({
        accountId,
        name,
        emoji,
      });

      return created({
        id: category.id,
        name: category.name,
      });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
