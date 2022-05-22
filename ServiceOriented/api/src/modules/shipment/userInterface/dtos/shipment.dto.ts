import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CurrentAddressDto {
  @IsNotEmpty()
  @ApiProperty()
  state: string;

  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsNotEmpty()
  @ApiProperty()
  address_line: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  zipCode: string;
}

export class ShipmentDto {
  @IsNotEmpty()
  @ApiProperty()
  orderId: string;

  @IsNotEmpty()
  @ApiProperty()
  shipmentInfo: string;

  @IsNotEmpty()
  @ApiProperty()
  shipmentState: string;

  @IsNotEmpty()
  @ApiProperty()
  currentAddress: CurrentAddressDto;
}
