import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { IncomingKafkaMessage } from 'src/infrastructure/adapters/event/incoming-kafka-message';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { UpdateShipmentState } from 'src/modules/shipment/applicationCore/applicationServices/useCases';
import { Topic } from 'src/shared/enums/topics';

@Controller()
export class ShipmentController {
  private logger = new Logger(ShipmentController.name);

  constructor(
    private readonly updateShipmentStateService: UpdateShipmentState,
  ) {}

  @EventPattern(Topic.UpdateShipmentState)
  async handle(@Payload() data: IncomingKafkaMessage<OrderEntity>) {
    this.logger.verbose(
      `Received delta updates: ${JSON.stringify(data.value)}`,
    );
    if (!data.value) {
      this.logger.error(`Change Stream has no value`);
      return;
    }

    return this.updateShipmentStateService.update(data.value);
  }
}
