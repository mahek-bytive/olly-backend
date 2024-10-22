import dotenv from 'dotenv';

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

export const SERVER = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ?? 3000,
};

export const CORS = {
  ORIGIN: process.env.CORS_ORIGIN,
  CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
};
