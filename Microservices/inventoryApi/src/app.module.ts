import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { InventoryModule } from 'src/modules/inventory/inventory.module';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(serviceConfig.mongoUrl),
    ProductModule,
    InventoryModule,
  ],
})
export class AppModule {}
