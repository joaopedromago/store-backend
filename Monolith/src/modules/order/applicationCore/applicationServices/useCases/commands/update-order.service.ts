import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { InventoryDto } from 'src/modules/inventory/userInterface/dtos';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';
import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';

@Injectable()
export class UpdateOrder {
  private readonly logger = new Logger(UpdateOrder.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly productRepository: ProductRepositoryPort,
    private readonly inventoryManageService: InventoryManage,
  ) {}

  async update(id: string, order: OrderDto) {
    this.logger.verbose('Updating Order');

    const orderEntity = await this.orderRepository.getOrderById(id);

    if (!orderEntity) {
      throw new NotFoundException('Order Not Found');
    }

    await this.changeInventory(order, orderEntity);
    orderEntity.updateValues(order);

    await this.orderRepository.updateOrder(orderEntity);
  }

  async changeInventory(newOrder: OrderDto, oldOrder: OrderEntity) {
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
