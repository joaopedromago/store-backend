import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { ManageProductInventoryFromOrderCreation } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class CreateOrder {
  private readonly logger = new Logger(CreateOrder.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly manageProductInventoryFromOrderCreationService: ManageProductInventoryFromOrderCreation,
  ) {}

  async create(order: OrderDto): Promise<OrderEntity> {
    try {
      this.logger.verbose('Creating Order');

      await this.manageProductInventoryFromOrderCreationService.manage(order);
      const result = await this.orderRepository.createOrder(order);

      return result;
    } catch (error) {
      throw new BadRequestException(error.response?.data?.message ?? error.message);
    }
  }
}
