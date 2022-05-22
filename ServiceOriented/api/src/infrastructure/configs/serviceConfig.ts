import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export const serviceConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/ServiceOrientedApiDb',
};
