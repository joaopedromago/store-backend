import { Controller, Body, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PaymentService } from 'src/modules/payment/applicationCore/applicationServices/useCases';
import { PaymentStatusDto } from 'src/modules/payment/userInterface/dtos';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Altera o status do pagamento',
  })
  @Put('/status')
  updatePaymentStatus(@Body() payload: PaymentStatusDto) {
    return this.paymentService.updatePaymentStatus(payload);
  }
}
