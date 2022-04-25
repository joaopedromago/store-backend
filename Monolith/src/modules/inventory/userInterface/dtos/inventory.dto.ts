import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class InventoryDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: string;

  @IsNotEmpty()
  @ApiProperty()
  inventoryMovement: number;
}
