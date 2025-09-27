import { Controller, Inject, Post, Req } from '@nestjs/common';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { CreateCategory } from '../../domain/ports/create-category';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { CategoryAlreadyExistsError, MissingParamError } from '@/shared/errors';
import {
  badRequest,
  created,
  serverError,
} from '@/shared/presentation/helpers/http-response';

@Controller('category')
export class CreateCategoryController extends BaseController<
  Omit<CreateCategoryModel.Params, 'accountId'>,
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
    @Req() request: HttpRequest<Omit<CreateCategoryModel.Params, 'accountId'>>,
  ): Promise<HttpResponse<CreateCategoryModel.Result | string>> {
    try {
      const requiredFields = ['name', 'emoji'];
      const accountId = request['decoded']?.sub;

      const hasError = this.validateRequiredFields(
        request.body,
        requiredFields,
      );
      if (hasError) return badRequest(new MissingParamError(hasError));

      const { name, emoji } = request.body;
      const category = await this.createCategory.execute({
        accountId,
        name,
        emoji,
      });

      return created<CreateCategoryModel.Result>({
        id: category.id,
        name: category.name,
      });
    } catch (error) {
      if (error instanceof CategoryAlreadyExistsError) {
        return badRequest(error);
      }
      return serverError();
    }
  }
}
