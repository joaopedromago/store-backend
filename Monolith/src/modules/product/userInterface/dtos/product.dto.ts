import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class ProductInventoryDto {
  @ApiProperty({ required: false })
  lastUpdate: Date;

  @ApiProperty({ required: false })
  stockAmount: number;
}

export class ProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @ApiProperty({ required: false })
  inventory: ProductInventoryDto;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}
