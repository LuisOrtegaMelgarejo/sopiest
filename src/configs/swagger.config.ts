import { INestApplication } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default registerAs('swagger', () => ({
  tittle: 'Sopiest MS',
  description:
    'Se encarga de toda la gestión de subida y visualizacion de certificados.',
  path: '/doc',
  version: '1.0',
  nameTag: 'sopiest-certificate'
}));

export const buildDocument = (app: INestApplication, configService: ConfigService) => {
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.tittle'))
    .setDescription(configService.get<string>('swagger.description'))
    .setVersion(configService.get<string>('swagger.version'))
    .addTag(configService.get<string>('swagger.nameTag'))
    .build();
  return SwaggerModule.createDocument(app, config);
};
