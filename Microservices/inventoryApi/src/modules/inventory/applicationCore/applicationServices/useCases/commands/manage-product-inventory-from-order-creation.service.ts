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
export class ManageProductInventoryFromOrderCreation {
  private readonly logger = new Logger(
    ManageProductInventoryFromOrderCreation.name,
  );

  constructor(
    private readonly productRepository: ProductRepositoryPort,
    private readonly inventoryManageService: InventoryManage,
  ) {}

  async manage(order: OrderDto) {
    const inventoryChanges: InventoryDto[] = [];

    await Promise.all(
      order.items.map(async (item) => {
        const productId = item.product.productId;

        const product = await this.productRepository.getProductById(productId);

        if (!product) {
          throw new NotFoundException(`Product ${productId} not found`);
        }

        if (product.getStock() < item.quantity) {
          throw new BadRequestException(`Product ${productId} out of stock!`);
        }

        const inventoryChange = new InventoryDto();
        inventoryChange.productId = productId;
        inventoryChange.inventoryMovement = -item.quantity;

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
