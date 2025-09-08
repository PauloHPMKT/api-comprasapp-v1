import { Provider } from '@nestjs/common';
import { MongoHelper } from '../mongodb/helpers/mongo-helper';
import { EnvConfigService } from '@/shared/env-config/env-config.service';

export const makeDatabaseProviders: Provider[] = [
  {
    provide: 'DATABSE_CONNECTION',
    useFactory: async (envConfig: EnvConfigService) => {
      const uri = envConfig.getEnv('DATABASE_URL');
      await MongoHelper.connect(uri);
      return MongoHelper.client;
    },
    inject: [EnvConfigService],
  },
];
