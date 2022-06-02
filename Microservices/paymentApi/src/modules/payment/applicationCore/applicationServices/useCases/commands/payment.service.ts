import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventBusPort } from 'src/infrastructure/ports/event-bus.port';

import { PaymentStatusDto } from 'src/modules/payment/userInterface/dtos';
import { Topic } from 'src/shared/enums/topics';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly eventService: EventBusPort<PaymentStatusDto>) {}

  async updatePaymentStatus(paymentStatus: PaymentStatusDto) {
    this.logger.verbose('Updating Payment status');

    this.eventService.emit(Topic.UpdatePaymentStatus, paymentStatus);
  }
}
