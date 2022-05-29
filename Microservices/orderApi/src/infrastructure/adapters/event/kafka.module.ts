import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { KafkaOptions } from 'src/infrastructure/adapters/event/kafka.config';
import { KafkaProvider } from 'src/infrastructure/adapters/event/kafka.provider';

@Module({
  imports: [ClientsModule.register([KafkaOptions])],
  providers: [KafkaProvider],
  exports: [KafkaProvider],
})
export class KafkaModule {}
