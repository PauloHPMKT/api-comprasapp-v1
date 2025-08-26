import { ObjectId } from 'mongodb';
import { ToRepositoryModel } from '../../data/models/to-repository';
import { CreateDefaultCategoriesRepositoryPort } from '../../data/ports/create-default-categories.repository';
import { MongoHelper } from '@/modules/database/mongodb/helpers/mongo-helper';

export class MongoCategoriesRepository
  implements CreateDefaultCategoriesRepositoryPort
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
}
