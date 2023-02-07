import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { buildBanner } from './configs/app.config';
import { buildDocument } from './configs/swagger.config';

async function bootstrap() {
  // Initial const(s)
  const logger = new Logger(bootstrap.name);

  // AppModule Configuration
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log']
  });

  const config = app.get(ConfigService);
  // App Setup
  const appConfig = config.get('app');
  app.setGlobalPrefix(appConfig.baseContextPath);
  app.enableCors();
  // Swagger Setup
  const swaggerConfig = config.get('swagger');
  SwaggerModule.setup(`${appConfig.baseContextPath + swaggerConfig.path}`, app, buildDocument(app, config));

  await app.startAllMicroservices();

  app.useGlobalFilters();
  // Start the server
  await app.listen(appConfig.port, appConfig.host);
  logger.log(buildBanner(config));
}
bootstrap();
