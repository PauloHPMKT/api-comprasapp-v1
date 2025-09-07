import { Inject, Injectable } from '@nestjs/common';
import { CreateCategory } from '../../domain/ports/create-category';
import { CreateCategoryModel } from '../../domain/models/create-category';
import { VerifyCategoryExistsRepository } from '../ports/verify-category-exists';
import { CreateCategoryRepositoryPort } from '../ports/create-category';

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
      data.name,
    );
    if (isCategoryExists)
      throw new Error('Uma categoria com o nome any_nam já existe!');

    await this.createCategoryRepositoryPort.create({
      id: 'any_id',
      accountId: data.accountId,
      name: data.name,
      emoji: data.emoji,
      createdAt: new Date(),
    });

    return { id: 'any_id', name: data.name };
  }
}
