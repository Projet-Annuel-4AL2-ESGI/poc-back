import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: '7mb' }));
  app.use(bodyParser.urlencoded({ limit: '7mb' }));
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Poc devnet')
  .setDescription('The devnet API description')
  .setVersion('1.0')
  .addTag('devnet')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
