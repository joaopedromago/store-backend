import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { InventoryDto } from 'src/modules/inventory/userInterface/dtos';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';

@Injectable()
export class DeleteOrderById {
  private readonly logger = new Logger(DeleteOrderById.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly inventoryManageService: InventoryManage,
  ) {}

  async deleteById(id: string) {
    this.logger.verbose('Deleting Order');

    const orderEntity = await this.orderRepository.getOrderById(id);

    if (!orderEntity) {
      throw new NotFoundException('Order Not Found');
    }

    await this.changeInventory(orderEntity);
    await this.orderRepository.deleteById(id);
  }

  async changeInventory(order: OrderEntity) {
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
