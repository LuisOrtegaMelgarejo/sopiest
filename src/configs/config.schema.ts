import * as Joi from 'joi';

export const validationSchema = Joi.object({
  COUNTRY: Joi.string(),
  COUNTRY_CODE: Joi.string().required(),
  TIME_ZONE: Joi.string().required(),
  BASE_CONTEXT_PATH: Joi.string().default('api/turbo-edi-savvy-ms'),
  APP_PORT: Joi.number().default(8080),
  APP_HOST: Joi.string().default('0.0.0.0'),
});
