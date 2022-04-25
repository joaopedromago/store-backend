import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { InventoryDto } from 'src/modules/inventory/userInterface/dtos';
import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';

@Injectable()
export class InventoryManage {
  private readonly logger = new Logger(InventoryManage.name);

  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async manage(inventory: InventoryDto) {
    this.logger.verbose('Creating Inventory');

    const product = await this.productRepository.getProductById(
      inventory.productId,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    this.logger.log({
      message: 'Updating Inventory with new Movement',
      data: inventory.inventoryMovement,
    });
    product.updateStock(inventory.inventoryMovement);

    this.logger.log({
      message: 'Product Updating',
      data: product,
    });

    await this.productRepository.updateProduct(product);
  }
}
