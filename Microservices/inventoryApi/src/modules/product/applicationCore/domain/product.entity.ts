import { Prop, Schema } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { UpdateProductDto } from 'src/modules/product/userInterface/dtos';
import { SchemaFactoryWithMethods } from 'src/shared/utils/schema-factory-with-methods';

export class ProductInventoryEntity {
  @Prop()
  lastUpdate: Date;

  @Prop()
  stockAmount: number;
}

@Schema({ collection: 'Product' })
export class ProductEntity {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  amount: number;

  @Prop()
  inventory: ProductInventoryEntity;

  updateStock(movement: number) {
    const newInventory = new ProductInventoryEntity();
    newInventory.lastUpdate = new Date();
    newInventory.stockAmount = (this.inventory.stockAmount || 0) + movement;

    this.inventory = newInventory;
  }

  getStock() {
    return this.inventory.stockAmount;
  }

  updateValues(orderDto: UpdateProductDto) {
    this.name = orderDto.name;
    this.type = orderDto.type;
    this.amount = orderDto.amount;
  }
}

export type ProductEntityDocument = ProductEntity & Document;

export const ProductEntitySchema =
  SchemaFactoryWithMethods.createForClass(ProductEntity);
