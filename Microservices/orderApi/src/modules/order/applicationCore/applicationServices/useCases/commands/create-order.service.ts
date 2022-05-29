import { Injectable, Logger } from '@nestjs/common';

import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class CreateOrder {
  private readonly logger = new Logger(CreateOrder.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async create(order: OrderDto): Promise<OrderEntity> {
    this.logger.verbose('Creating Order');

    // TODO: call change inventory
    // await this.changeInventory(order);
    const result = await this.orderRepository.createOrder(order);

    return result;
  }

  // async changeInventory(order: OrderDto) {
  //   const inventoryChanges: InventoryDto[] = [];

  //   await Promise.all(
  //     order.items.map(async (item) => {
  //       const productId = item.product.productId;

  //       const product = await this.productRepository.getProductById(productId);

  //       if (!product) {
  //         throw new NotFoundException(`Product ${productId} not found`);
  //       }

  //       if (product.getStock() < item.quantity) {
  //         throw new BadRequestException(`Product ${productId} out of stock!`);
  //       }

  //       const inventoryChange = new InventoryDto();
  //       inventoryChange.productId = productId;
  //       inventoryChange.inventoryMovement = -item.quantity;

  //       inventoryChanges.push(inventoryChange);
  //     }),
  //   );

  //   await Promise.all(
  //     inventoryChanges.map(async (change) => {
  //       await this.inventoryManageService.manage(change);
  //     }),
  //   );
  // }
}
