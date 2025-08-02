import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './shared/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfigService = app.get(EnvConfigService);
  const port = envConfigService.getEnv<number>('PORT');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(port);
}
bootstrap();
