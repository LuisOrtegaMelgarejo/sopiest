import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  url: process.env.DOMAIN,
  baseContextPath: process.env.BASE_CONTEXT_PATH,
  host: process.env.APP_HOST,
  port: process.env.APP_PORT
}));

const banner = `Welcome to Sopiest`;

export const buildBanner = (configService: ConfigService) => {
  return `
  ${banner}
  Host: ${configService.get<string>('app.host')}
  Port: ${configService.get<string>('app.port')}
  Context Path: ${configService.get<string>('app.baseContextPath')}
  Environment: ${configService.get<number>('app.env')}
  `;
};
