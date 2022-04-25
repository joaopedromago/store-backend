import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { PaymentStatusDto } from 'src/modules/payment/userInterface/dtos';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async updatePaymentStatus(paymentStatus: PaymentStatusDto) {
    this.logger.verbose('Updating Payment status');

    const orderEntity = await this.orderRepository.getOrderById(
      paymentStatus.orderId,
    );

    if (!orderEntity) {
      throw new NotFoundException('Order Not Found');
    }

    orderEntity.updatePayment(paymentStatus);

    await this.orderRepository.updateOrder(orderEntity);
  }
}
