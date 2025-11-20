import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Server
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),

  // Database
  DATABASE_URL: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  // CORS
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),

  // Email
  EMAIL_FROM: Joi.string().email().default('noreply@saas-psy.com'),
  RESEND_API_KEY: Joi.string().optional(),

  // Frontend
  NEXT_PUBLIC_APP_URL: Joi.string().default('http://localhost:3000'),
});

