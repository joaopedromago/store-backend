import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional } from 'class-validator';

export class OrderProductDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: string;

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

export class OrderItemDto {
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  product: OrderProductDto;
}

export class CustomerDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  document: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  phone: string;
}

export class AddressDto {
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

export class OrderDto {
  @IsOptional()
  @ApiProperty()
  _id?: string;

  @IsNotEmpty()
  @ApiProperty({
    type: () => [OrderItemDto],
  })
  items: OrderItemDto[];

  @IsNotEmpty()
  @ApiProperty()
  customer: CustomerDto;

  @IsNotEmpty()
  @ApiProperty()
  address: AddressDto;
}
