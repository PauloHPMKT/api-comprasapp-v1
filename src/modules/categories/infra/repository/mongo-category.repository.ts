import { ObjectId } from 'mongodb';
import { ToRepositoryModel } from '../../data/models/to-repository';
import { CreateDefaultCategoriesRepositoryPort } from '../../data/ports/create-default-categories.repository';
import { VerifyCategoryExistsRepository } from '../../data/ports/verify-category-exists';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';

export class MongoCategoriesRepository
  implements
    CreateDefaultCategoriesRepositoryPort,
    VerifyCategoryExistsRepository
{
  async addCategories(data: ToRepositoryModel.Category[]): Promise<void> {
    const categories = data.map((category) => ({
      _id: new ObjectId(category.id),
      accountId: category.accountId,
      name: category.name,
      emoji: category.emoji,
      createdAt: category.createdAt,
    }));
    const categoryCollection = MongoHelper.getCollection('categories');
    await categoryCollection.insertMany(categories);
  }

  async verify(categoryName: string): Promise<boolean> {
    const categoryCollection = MongoHelper.getCollection('categories');
    const category = await categoryCollection.findOne(
      { name: categoryName },
      { projection: { _id: 1 } },
    );
    return !!category;
  }
}
