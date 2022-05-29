import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderRepositoryProvider } from 'src/infrastructure/adapters';
import {
  OrderEntity,
  OrderEntitySchema,
} from 'src/modules/order/applicationCore/domain/order.entity';
import { UpdatePaymentStatus } from 'src/modules/payment/applicationCore/applicationServices/useCases';
import { PaymentController } from 'src/modules/payment/userInterface/eventControllers/payment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderEntity.name,
        schema: OrderEntitySchema,
      },
    ]),
  ],
  providers: [OrderRepositoryProvider, UpdatePaymentStatus],
  controllers: [PaymentController],
})
export class PaymentModule {}
