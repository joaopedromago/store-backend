import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { RequestProvider } from 'src/infrastructure/interfaces';
import { EventBusPort } from 'src/infrastructure/ports/event-bus.port';
import { OrderDto, ShipmentDto } from 'src/modules/shipment/userInterface/dtos';
import { Topic } from 'src/shared/enums/topics';

@Injectable()
export class UpdateShipmentState {
  private readonly logger = new Logger(UpdateShipmentState.name);

  constructor(
    private readonly requestProvider: RequestProvider,
    private readonly eventService: EventBusPort<OrderDto>,
  ) {}

  async update(shipment: ShipmentDto) {
    this.logger.verbose('Updating Shipment');

    const result = await this.requestProvider.get<OrderDto>(
      `${serviceConfig.getOrderUrl}${shipment.orderId}`,
    );
    this.logger.verbose(`Order Retrieved ${result.data}`);

    const order = result.data;

    if (!order) {
      throw new NotFoundException('Order Not Found');
    }

    order.shipment = shipment;

    this.eventService.emit(Topic.UpdateShipmentState, order);
  }
}
