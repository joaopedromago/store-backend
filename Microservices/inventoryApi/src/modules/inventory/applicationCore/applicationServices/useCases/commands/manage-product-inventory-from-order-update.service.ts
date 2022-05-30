import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases/commands/inventory-manage.service';
import {
  InventoryDto,
  OrderDto,
} from 'src/modules/inventory/userInterface/dtos';
import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';

@Injectable()
export class ManageProductInventoryFromOrderUpdate {
  private readonly logger = new Logger(
    ManageProductInventoryFromOrderUpdate.name,
  );

  constructor(
    private readonly productRepository: ProductRepositoryPort,
    private readonly inventoryManageService: InventoryManage,
  ) {}

  async manage(newOrder: OrderDto, oldOrder: OrderDto) {
    const inventoryChanges: InventoryDto[] = [];

    newOrder.items.forEach(async (item) => {
      const productId = item.product.productId;

      const inventoryChange = new InventoryDto();
      inventoryChange.productId = productId;
      inventoryChange.inventoryMovement = -item.quantity;

      inventoryChanges.push(inventoryChange);
    });

    oldOrder.items.forEach(async (item) => {
      const productId = item.product.productId;

      const existingItem = inventoryChanges.find(
        (item) => item.productId === productId,
      );
      if (existingItem) {
        existingItem.inventoryMovement += item.quantity;
      } else {
        const inventoryChange = new InventoryDto();
        inventoryChange.productId = productId;
        inventoryChange.inventoryMovement = -item.quantity;

        inventoryChanges.push(inventoryChange);
      }
    });

    await Promise.all(
      inventoryChanges.map(async (change) => {
        const productId = change.productId;

        const product = await this.productRepository.getProductById(productId);

        if (!product) {
          throw new NotFoundException(`Product ${productId} not found`);
        }

        if (product.getStock() < -change.inventoryMovement) {
          throw new BadRequestException(`Product ${productId} out of stock!`);
        }

        await this.inventoryManageService.manage(change);
      }),
    );
  }
}
