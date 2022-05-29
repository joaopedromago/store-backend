import { ClientProviderOptions, Transport } from '@nestjs/microservices';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';

export const KafkaOptions: ClientProviderOptions = {
  name: 'KAFKA_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: serviceConfig.kafkaClientId,
      brokers: [serviceConfig.kafkaUrl || 'localhost:9092'],
    },
    consumer: {
      groupId: serviceConfig.kafkaClientId,
    },
  },
};
