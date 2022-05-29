import { Module } from '@nestjs/common';

import { KafkaModule } from 'src/infrastructure/adapters/event/kafka.module';
import { AxiosModule } from 'src/infrastructure/plugins/axios/axios.module';
import { UpdateShipmentState } from 'src/modules/shipment/applicationCore/applicationServices/useCases';
import { ShipmentController } from 'src/modules/shipment/userInterface/restControllers/shipment.controller';

@Module({
  imports: [KafkaModule, AxiosModule],
  providers: [UpdateShipmentState],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
