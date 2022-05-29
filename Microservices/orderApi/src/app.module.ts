import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { OrderModule } from 'src/modules/order/order.module';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { ShipmentModule } from 'src/modules/shipment/shipment.module';

@Module({
  imports: [
    MongooseModule.forRoot(serviceConfig.mongoUrl),
    OrderModule,
    PaymentModule,
    ShipmentModule,
  ],
})
export class AppModule {}
