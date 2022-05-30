import { Injectable, Logger } from '@nestjs/common';

import { serviceConfig } from 'src/infrastructure/configs/serviceConfig';
import { RequestProvider } from 'src/infrastructure/interfaces';
import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class ManageProductInventoryFromOrderUpdate {
  private readonly logger = new Logger(
    ManageProductInventoryFromOrderUpdate.name,
  );

  constructor(private readonly requestProvider: RequestProvider) {}

  async manage(newOrder: OrderDto, oldOrder: OrderEntity) {
    this.logger.verbose('Updating Inventory');

    await this.requestProvider.post(
      `${serviceConfig.inventoryUrl}manageProductInventoryFromOrderUpdate`,
      { newOrder, oldOrder },
    );
  }
}
