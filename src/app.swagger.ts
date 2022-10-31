import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SERVER_NAME } from './config/constants';

export const initSwagger = (app: INestApplication) => {
  const config = app.get(ConfigService);
  const serverName = config.get<string>(SERVER_NAME);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Getonboard API')
    .addServer(serverName)
    .addBearerAuth()
    .setDescription(
      'Esta es una API Creada con NestJS con un CRUD básico para un Sistema de Trabajos.',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
