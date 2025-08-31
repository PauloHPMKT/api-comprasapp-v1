import { MissingParamError } from '@/shared/errors';
import { badRequest } from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import { Controller, Inject, Post, Req } from '@nestjs/common';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { CreateCategory } from '../../domain/ports/create-category';

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
    const requiredFields = ['name', 'emoji'];

    const hasError = this.validateRequiredFields(request.body, requiredFields);
    if (hasError) return badRequest(new MissingParamError(hasError));

    const { accountId, name, emoji } = request.body;

    await this.createCategory.execute({
      accountId,
      name,
      emoji,
    });

    return {
      statusCode: 201,
      body: {
        id: 'any_category_id',
        name: 'Category created successfully',
      },
    };
  }
}
