import { Module } from '@nestjs/common';

import { ShipmentModule } from 'src/modules/shipment/shipment.module';

@Module({
  imports: [ShipmentModule],
})
export class AppModule {}
