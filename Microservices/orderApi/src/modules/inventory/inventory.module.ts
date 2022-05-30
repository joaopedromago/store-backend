import { Module } from '@nestjs/common';

import { KafkaModule } from 'src/infrastructure/adapters/event/kafka.module';
import { AxiosModule } from 'src/infrastructure/plugins/axios/axios.module';
import {
  AddProductInventoryFromOrder,
  ManageProductInventoryFromOrderCreation,
  ManageProductInventoryFromOrderUpdate,
} from 'src/modules/inventory/applicationCore/applicationServices/useCases';

@Module({
  imports: [KafkaModule, AxiosModule],
  providers: [
    ManageProductInventoryFromOrderCreation,
    ManageProductInventoryFromOrderUpdate,
    AddProductInventoryFromOrder,
  ],
  exports: [
    ManageProductInventoryFromOrderCreation,
    ManageProductInventoryFromOrderUpdate,
    AddProductInventoryFromOrder,
  ],
})
export class InventoryModule {}
