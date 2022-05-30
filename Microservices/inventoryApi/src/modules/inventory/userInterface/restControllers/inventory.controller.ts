import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  AddProductInventoryFromOrder,
  InventoryManage,
  ManageProductInventoryFromOrderCreation,
  ManageProductInventoryFromOrderUpdate,
} from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import {
  InventoryDto,
  OrderDto,
} from 'src/modules/inventory/userInterface/dtos';

@ApiTags('Inventário')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryManage: InventoryManage,
    private readonly manageProductInventoryFromOrderCreationService: ManageProductInventoryFromOrderCreation,
    private readonly manageProductInventoryFromOrderUpdateService: ManageProductInventoryFromOrderUpdate,
    private readonly addProductInventoryFromOrderService: AddProductInventoryFromOrder,
  ) {}

  @ApiOperation({
    summary: 'Atualização de inventário',
  })
  @Post('/manage')
  update(@Body() payload: InventoryDto) {
    return this.inventoryManage.manage(payload);
  }

  @ApiOperation({
    summary:
      'Validação e atualização de inventário a partir de criação de ordem',
  })
  @Post('/manageProductInventoryFromOrderCreation')
  manageProductInventoryFromOrderCreation(@Body() payload: OrderDto) {
    return this.manageProductInventoryFromOrderCreationService.manage(payload);
  }

  @ApiOperation({
    summary: 'Atualização de inventário a partir de atualização de ordem',
  })
  @Post('/manageProductInventoryFromOrderUpdate')
  manageProductInventoryFromOrderUpdate(
    @Body() payload: { newOrder: OrderDto; oldOrder: OrderDto },
  ) {
    const { newOrder, oldOrder } = payload;

    return this.manageProductInventoryFromOrderUpdateService.manage(
      newOrder,
      oldOrder,
    );
  }

  @ApiOperation({
    summary: 'Adição de itens ao inventário a partir de uma ordem',
  })
  @Post('/addProductInventoryFromOrder')
  addProductInventoryFromOrder(@Body() payload: OrderDto) {
    return this.addProductInventoryFromOrderService.add(payload);
  }
}
