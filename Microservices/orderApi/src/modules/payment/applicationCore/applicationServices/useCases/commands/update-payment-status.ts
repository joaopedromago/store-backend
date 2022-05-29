import { Injectable, Logger } from '@nestjs/common';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';
import { PaymentStatusDto } from 'src/modules/payment/userInterface/dtos';

@Injectable()
export class UpdatePaymentStatus {
  private readonly logger = new Logger(UpdatePaymentStatus.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async update(payload: PaymentStatusDto) {
    this.logger.log(`Updating payment from payload: ${JSON.stringify(payload)}`);
    const orderEntity = await this.orderRepository.getOrderById(payload.orderId);
    orderEntity.updatePayment(payload);

    await this.orderRepository.updateOrder(orderEntity);
  }
}
