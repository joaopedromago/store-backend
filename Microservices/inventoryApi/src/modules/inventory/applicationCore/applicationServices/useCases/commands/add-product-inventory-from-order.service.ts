import { Injectable, Logger } from '@nestjs/common';

import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases/commands/inventory-manage.service';
import {
  InventoryDto,
  OrderDto,
} from 'src/modules/inventory/userInterface/dtos';

@Injectable()
export class AddProductInventoryFromOrder {
  private readonly logger = new Logger(AddProductInventoryFromOrder.name);

  constructor(private readonly inventoryManageService: InventoryManage) {}

  async add(order: OrderDto) {
    const inventoryChanges: InventoryDto[] = [];

    await Promise.all(
      order.items.map(async (item) => {
        const productId = item.product.productId;

        const inventoryChange = new InventoryDto();
        inventoryChange.productId = productId;
        inventoryChange.inventoryMovement = item.quantity;

        inventoryChanges.push(inventoryChange);
      }),
    );

    await Promise.all(
      inventoryChanges.map(async (change) => {
        await this.inventoryManageService.manage(change);
      }),
    );
  }
}
