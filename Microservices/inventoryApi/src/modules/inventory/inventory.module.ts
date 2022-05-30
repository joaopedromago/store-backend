import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductRepositoryProvider } from 'src/infrastructure/adapters/repository/product.repository';
import {
  AddProductInventoryFromOrder,
  InventoryManage,
  ManageProductInventoryFromOrderCreation,
  ManageProductInventoryFromOrderUpdate,
} from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { InventoryController } from 'src/modules/inventory/userInterface/restControllers/inventory.controller';
import {
  ProductEntity,
  ProductEntitySchema,
} from 'src/modules/product/applicationCore/domain/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductEntity.name,
        schema: ProductEntitySchema,
      },
    ]),
  ],
  providers: [
    ProductRepositoryProvider,
    InventoryManage,
    ManageProductInventoryFromOrderCreation,
    ManageProductInventoryFromOrderUpdate,
    AddProductInventoryFromOrder,
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
