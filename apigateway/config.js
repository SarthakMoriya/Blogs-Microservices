import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  CREATE_SERVICE_URL: process.env.CREATE_SERVICE_URL,
  DELETE_SERVICE_URL: process.env.DELETE_SERVICE_URL,
  UPDATE_SERVICE_URL: process.env.UPDATE_SERVICE_URL,
  GET_SERVICE_URL: process.env.GET_SERVICE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'SECRETS',
};

export default config;