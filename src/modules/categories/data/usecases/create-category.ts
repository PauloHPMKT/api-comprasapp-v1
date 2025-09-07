import { Injectable } from '@nestjs/common';
import { CreateCategory } from '../../domain/ports/create-category';
import { CreateCategoryModel } from '../../domain/models/create-category';

@Injectable()
export class CreateCategoryUseCase implements CreateCategory {
  async execute(
    data: CreateCategoryModel.Params,
  ): Promise<CreateCategoryModel.Result> {
    if (!data.accountId) {
      throw new Error('accountId não fornecido');
    }
    return { id: 'any_id', name: data.name };
  }
}
