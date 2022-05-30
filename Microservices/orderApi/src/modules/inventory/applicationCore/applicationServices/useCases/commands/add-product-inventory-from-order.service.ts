import { Injectable, Logger } from '@nestjs/common';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { RequestProvider } from 'src/infrastructure/interfaces';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';

@Injectable()
export class AddProductInventoryFromOrder {
  private readonly logger = new Logger(AddProductInventoryFromOrder.name);

  constructor(private readonly requestProvider: RequestProvider) {}

  async add(order: OrderEntity) {
    this.logger.verbose('Updating Inventory');

    await this.requestProvider.post(
      `${serviceConfig.inventoryUrl}addProductInventoryFromOrder`,
      order,
    );
  }
}
