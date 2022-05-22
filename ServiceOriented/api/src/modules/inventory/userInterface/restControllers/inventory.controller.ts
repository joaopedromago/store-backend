import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryManage } from 'src/modules/inventory/applicationCore/applicationServices/useCases';
import { InventoryDto } from 'src/modules/inventory/userInterface/dtos';

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
}
