import { Injectable, Logger } from '@nestjs/common';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';

@Injectable()
export class ListOrder {
  private readonly logger = new Logger(ListOrder.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async list() {
    this.logger.verbose('Listing Order');

    return this.orderRepository.listOrder();
  }
}
