import { Provider } from '@nestjs/common';
import { MongoHelper } from '../mongodb/helpers/mongo-helper';

export const makeDatabaseProviders: Provider[] = [
  {
    provide: 'DATABSE_CONNECTION',
    useFactory: async () => {
      const uri = process.env.MONGO_URI || 'mongodb://db:27017/comprasapp';
      await MongoHelper.connect(uri);
      return MongoHelper.client;
    },
  },
];
