import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: '7mb' }));
  app.use(bodyParser.urlencoded({ limit: '7mb' }));
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
