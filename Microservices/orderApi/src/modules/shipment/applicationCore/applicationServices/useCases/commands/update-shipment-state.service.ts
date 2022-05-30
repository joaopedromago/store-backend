import { Injectable, Logger } from '@nestjs/common';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class UpdateShipmentState {
  private readonly logger = new Logger(UpdateShipmentState.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async update(order: OrderDto) {
    this.logger.log(
      `Updating shipment from order dto ${JSON.stringify(order)}`,
    );
    const orderEntity = await this.orderRepository.getOrderById(order._id);
    orderEntity.updateShipment(order.shipment);

    await this.orderRepository.updateOrder(orderEntity);
  }
}
