import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { InventoryModule } from 'src/modules/inventory/inventory.module';
import { OrderModule } from 'src/modules/order/order.module';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { ProductModule } from 'src/modules/product/product.module';
import { ShipmentModule } from 'src/modules/shipment/shipment.module';

@Module({
  imports: [
    MongooseModule.forRoot(serviceConfig.mongoUrl),
    InventoryModule,
    OrderModule,
    PaymentModule,
    ProductModule,
    ShipmentModule,
  ],
})
export class AppModule {}
