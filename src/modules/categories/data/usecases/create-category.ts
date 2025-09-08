import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../../domain/entities/Category';
import { CreateCategory } from '../../domain/ports/create-category';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { VerifyCategoryExistsRepository } from '../ports/verify-category-exists';
import { CreateCategoryRepositoryPort } from '../ports/create-category';
import { CategoryAlreadyExistsError } from '@/shared/errors';

@Injectable()
export class CreateCategoryUseCase implements CreateCategory {
  constructor(
    @Inject('VERIFY_CATEGORY_EXISTS_REPOSITORY_PORT')
    private readonly verifyCategoryExistsPort: VerifyCategoryExistsRepository,
    @Inject('CREATE_CATEGORY_REPOSITORY_PORT')
    private readonly createCategoryRepositoryPort: CreateCategoryRepositoryPort,
  ) {}

  async execute(
    data: CreateCategoryModel.Params,
  ): Promise<CreateCategoryModel.Result> {
    if (!data.accountId) throw new Error('accountId não fornecido');

    const isCategoryExists = await this.verifyCategoryExistsPort.verify(
      data.accountId,
      data.name,
    );
    if (isCategoryExists) throw new CategoryAlreadyExistsError(data.name);

    const category = new Category({
      accountId: data.accountId,
      name: data.name,
      emoji: data.emoji,
    }).toJSON();

    const { id, name } =
      await this.createCategoryRepositoryPort.create(category);

    return { id, name };
  }
}
