import { Injectable, Logger } from '@nestjs/common';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';

@Injectable()
export class UpdateShipmentState {
  private readonly logger = new Logger(UpdateShipmentState.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async update(orderEntity: OrderEntity) {
    this.logger.log(`Updating shipment from order entity ${orderEntity}`);

    await this.orderRepository.updateOrder(orderEntity);
  }
}
