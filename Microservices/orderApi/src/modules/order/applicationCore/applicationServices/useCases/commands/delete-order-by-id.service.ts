import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { AddProductInventoryFromOrder } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';

@Injectable()
export class DeleteOrderById {
  private readonly logger = new Logger(DeleteOrderById.name);

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly addProductInventoryFromOrderService: AddProductInventoryFromOrder,
  ) {}

  async deleteById(id: string) {
    try {
      this.logger.verbose('Deleting Order');

      const orderEntity = await this.orderRepository.getOrderById(id);

      if (!orderEntity) {
        throw new NotFoundException('Order Not Found');
      }

      await this.addProductInventoryFromOrderService.add(orderEntity);
      await this.orderRepository.deleteById(id);
    } catch (error) {
      throw new BadRequestException(error.response?.data?.message ?? error.message);
    }
  }
}
