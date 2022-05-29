import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class PaymentStatusDto {
  @IsNotEmpty()
  @ApiProperty()
  orderId: string;

  @IsNotEmpty()
  @ApiProperty()
  paymentState: string;

  @IsNotEmpty()
  @ApiProperty()
  creditCardToken: string;
}
