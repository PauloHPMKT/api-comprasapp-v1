import { Inject, Injectable } from '@nestjs/common';
import { CreateCategory } from '../../domain/ports/create-category';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { VerifyCategoryExistsRepository } from '../ports/verify-category-exists';

@Injectable()
export class CreateCategoryUseCase implements CreateCategory {
  constructor(
    @Inject('VERIFY_CATEGORY_EXISTS_REPOSITORY_PORT')
    private readonly verifyCategoryExistsPort: VerifyCategoryExistsRepository,
  ) {}

  async execute(
    data: CreateCategoryModel.Params,
  ): Promise<CreateCategoryModel.Result> {
    if (!data.accountId) throw new Error('accountId não fornecido');

    const isCategoryExists = await this.verifyCategoryExistsPort.verify(
      data.name,
    );
    if (isCategoryExists)
      throw new Error('Uma categoria com o nome any_nam já existe!');

    return { id: 'any_id', name: data.name };
  }
}
