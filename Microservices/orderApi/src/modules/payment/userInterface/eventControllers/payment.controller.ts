import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { IncomingKafkaMessage } from 'src/infrastructure/adapters/event/incoming-kafka-message';
import { UpdatePaymentStatus } from 'src/modules/payment/applicationCore/applicationServices/useCases';
import { PaymentStatusDto } from 'src/modules/payment/userInterface/dtos';
import { Topic } from 'src/shared/enums/topics';

@Controller()
export class PaymentController {
  private logger = new Logger(PaymentController.name);

  constructor(
    private readonly updatePaymentStatusService: UpdatePaymentStatus,
  ) {}

  @EventPattern(Topic.UpdatePaymentStatus)
  async handle(@Payload() data: IncomingKafkaMessage<PaymentStatusDto>) {
    this.logger.verbose(
      `Received payment status update: ${JSON.stringify(data.value)}`,
    );
    if (!data.value) {
      this.logger.error(`Change Stream has no value`);
      return;
    }

    return this.updatePaymentStatusService.update(data.value);
  }
}
