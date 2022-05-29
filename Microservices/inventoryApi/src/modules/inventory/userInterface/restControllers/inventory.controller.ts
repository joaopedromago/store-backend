import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import {
  InventoryDto,
  OrderDto,
} from 'src/modules/inventory/userInterface/dtos';

@ApiTags('Inventário')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryManage: InventoryManage) {}

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
  @Post('/manage')
  updateByOrderCreation(@Body() payload: OrderDto) {
    // return this.inventoryManage.manage(payload);
  }

  @ApiOperation({
    summary: 'Atualização de inventário a partir de atualização de ordem',
  })
  @Post('/manageProductInventoryFromOrderUpdate')
  manageProductInventoryFromOrderUpdate(@Body() payload: OrderDto) {
    // return this.inventoryManage.manage(payload);
  }

  @ApiOperation({
    summary: 'Adição de itens ao inventário a partir de uma ordem',
  })
  @Post('/addProductInventoryFromOrder')
  addProductInventoryFromOrder(@Body() payload: OrderDto) {
    // return this.inventoryManage.manage(payload);
  }
}
