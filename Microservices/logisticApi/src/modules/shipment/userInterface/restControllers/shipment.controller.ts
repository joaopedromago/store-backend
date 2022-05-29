import { Controller, Body, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UpdateShipmentState } from 'src/modules/shipment/applicationCore/applicationServices/useCases';
import { ShipmentDto } from 'src/modules/shipment/userInterface/dtos';

@ApiTags('Entrega')
@Controller('shipment')
export class ShipmentController {
  constructor(
    private readonly updateShipmentStateService: UpdateShipmentState,
  ) {}

  @ApiOperation({
    summary: 'Atualização de entrega',
  })
  @Put('/status')
  update(@Body() payload: ShipmentDto) {
    return this.updateShipmentStateService.update(payload);
  }
}
