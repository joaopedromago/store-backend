import { Injectable, Logger } from '@nestjs/common';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { RequestProvider } from 'src/infrastructure/interfaces';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class ManageProductInventoryFromOrderCreation {
  private readonly logger = new Logger(
    ManageProductInventoryFromOrderCreation.name,
  );

  constructor(private readonly requestProvider: RequestProvider) {}

  async manage(order: OrderDto) {
    this.logger.verbose('Updating Inventory');

    await this.requestProvider.post(
      `${serviceConfig.inventoryUrl}/manageProductInventoryFromOrderCreation`,
      order,
    );
  }
}
