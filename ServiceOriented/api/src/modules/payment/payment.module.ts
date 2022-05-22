import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderRepositoryProvider } from 'src/infrastructure/adapters';
import {
  OrderEntity,
  OrderEntitySchema,
} from 'src/modules/order/applicationCore/domain/order.entity';
import { PaymentService } from 'src/modules/payment/applicationCore/applicationServices/useCases';
import { PaymentController } from 'src/modules/payment/userInterface/restControllers/payment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderEntity.name,
        schema: OrderEntitySchema,
      },
    ]),
  ],
  providers: [OrderRepositoryProvider, PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
