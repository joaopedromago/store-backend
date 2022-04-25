import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderRepositoryProvider } from 'src/infrastructure/adapters';
import {
  OrderEntity,
  OrderEntitySchema,
} from 'src/modules/order/applicationCore/domain/order.entity';
import { UpdateShipmentState } from 'src/modules/shipment/applicationCore/applicationServices/useCases';
import { ShipmentController } from 'src/modules/shipment/userInterface/restControllers/shipment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderEntity.name,
        schema: OrderEntitySchema,
      },
    ]),
  ],
  providers: [OrderRepositoryProvider, UpdateShipmentState],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
