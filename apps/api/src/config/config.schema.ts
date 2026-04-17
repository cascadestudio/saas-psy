import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Server
  NODE_ENV: Joi.string()
    .valid('production', 'staging', 'development')
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
  EMAIL_FROM: Joi.string().email().default('noreply@melya.app'),
  RESEND_API_KEY: Joi.string().optional(),

  // Frontend
  NEXT_PUBLIC_APP_URL: Joi.string().default('http://localhost:3000'),

  // Encryption (HDS compliance)
  ENCRYPTION_KEY: Joi.string().pattern(/^[0-9a-f]{64}$/i).required()
    .messages({
      'any.required': 'ENCRYPTION_KEY is required. Generate with: openssl rand -hex 32',
      'string.pattern.base': 'ENCRYPTION_KEY must be 64 hex characters (32 bytes)',
    }),
});

