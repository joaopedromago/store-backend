import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ManageProductInventoryFromOrderUpdate } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class UpdateOrder {
  private readonly logger = new Logger(UpdateOrder.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly manageProductInventoryFromOrderUpdateService: ManageProductInventoryFromOrderUpdate,
  ) {}

  async update(id: string, order: OrderDto) {
    try {
      this.logger.verbose('Updating Order');

      const orderEntity = await this.orderRepository.getOrderById(id);

      if (!orderEntity) {
        throw new NotFoundException('Order Not Found');
      }

      await this.manageProductInventoryFromOrderUpdateService.manage(
        order,
        orderEntity,
      );
      orderEntity.updateValues(order);

      await this.orderRepository.updateOrder(orderEntity);
    } catch (error) {
      throw new BadRequestException(error.response?.data?.message ?? error.message);
    }
  }
}
