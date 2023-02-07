import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  country_code: process.env.COUNTRY_CODE,
  time_zone: process.env.TIME_ZONE,
}));
