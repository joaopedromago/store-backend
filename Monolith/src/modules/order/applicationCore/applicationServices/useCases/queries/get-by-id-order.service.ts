import { Injectable, Logger } from '@nestjs/common';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';

@Injectable()
export class GetByIdOrder {
  private readonly logger = new Logger(GetByIdOrder.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async getById(id: string) {
    this.logger.verbose('Getting Order');

    return this.orderRepository.getOrderById(id);
  }
}
