import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export const serviceConfig = {
  kafkaUrl: process.env.KAFKA_URL,
  kafkaClientId: process.env.KAFKA_CLIENT_ID,
  getOrderUrl: process.env.GET_ORDER_URL || 'localhost:3000/order/',
};
