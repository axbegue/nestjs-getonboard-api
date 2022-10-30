import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>(SERVER_PORT); // 3000
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );

  await app.listen(port, () => console.log('La Api esta lista', port));
}

bootstrap();
