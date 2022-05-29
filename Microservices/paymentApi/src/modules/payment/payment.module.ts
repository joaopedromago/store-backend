import { Module } from '@nestjs/common';

import { KafkaModule } from 'src/infrastructure/adapters/event/kafka.module';
import { PaymentService } from 'src/modules/payment/applicationCore/applicationServices/useCases';
import { PaymentController } from 'src/modules/payment/userInterface/restControllers/payment.controller';

@Module({
  imports: [KafkaModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
