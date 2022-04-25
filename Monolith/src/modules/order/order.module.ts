import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderRepositoryProvider } from 'src/infrastructure/adapters';
import { ProductRepositoryProvider } from 'src/infrastructure/adapters/repository/product.repository';
import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
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
import {
  ProductEntity,
  ProductEntitySchema,
} from 'src/modules/product/applicationCore/domain/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderEntity.name,
        schema: OrderEntitySchema,
      },
      {
        name: ProductEntity.name,
        schema: ProductEntitySchema,
      },
    ]),
  ],
  providers: [
    OrderRepositoryProvider,
    ProductRepositoryProvider,
    InventoryManage,
    UpdateOrder,
    CreateOrder,
    ListOrder,
    GetByIdOrder,
    DeleteOrderById,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
