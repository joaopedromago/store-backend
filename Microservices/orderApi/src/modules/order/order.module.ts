import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderRepositoryProvider } from 'src/infrastructure/adapters';
import {
  UpdateOrder,
  CreateOrder,
  ListOrder,
  GetByIdOrder,
  DeleteOrderById,
} from 'src/modules/order/applicationCore/applicationServices/useCases';
import {
  OrderEntity,
  OrderEntitySchema,
} from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderController } from 'src/modules/order/userInterface/restControllers/order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderEntity.name,
        schema: OrderEntitySchema,
      },
    ]),
  ],
  providers: [
    OrderRepositoryProvider,
    UpdateOrder,
    CreateOrder,
    ListOrder,
    GetByIdOrder,
    DeleteOrderById,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
