import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { ShipmentDto } from 'src/modules/shipment/userInterface/dtos';

@Injectable()
export class UpdateShipmentState {
  private readonly logger = new Logger(UpdateShipmentState.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async update(shipment: ShipmentDto) {
    this.logger.verbose('Updating Shipment');

    const orderEntity = await this.orderRepository.getOrderById(
      shipment.orderId,
    );

    if (!orderEntity) {
      throw new NotFoundException('Order Not Found');
    }

    orderEntity.updateShipment(shipment);

    await this.orderRepository.updateOrder(orderEntity);
  }
}
