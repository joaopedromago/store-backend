import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export const serviceConfig = {
  mongoUrl:
    process.env.MONGO_URL || 'mongodb://localhost:27017/MicroserviceOrderApi',
  kafkaUrl: process.env.KAFKA_URL,
  kafkaClientId: process.env.KAFKA_CLIENT_ID,
};
