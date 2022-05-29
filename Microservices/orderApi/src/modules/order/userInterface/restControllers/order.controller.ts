import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import {
  UpdateOrder,
  CreateOrder,
  ListOrder,
  GetByIdOrder,
  DeleteOrderById,
} from 'src/modules/order/applicationCore/applicationServices/useCases';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@ApiTags('Ordem')
@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrder,
    private readonly updateOrderService: UpdateOrder,
    private readonly listOrderService: ListOrder,
    private readonly getByIdOrderService: GetByIdOrder,
    private readonly deleteOrderByIdService: DeleteOrderById,
  ) {}

  @ApiOperation({
    summary: 'Criação de ordem',
  })
  @Post()
  async create(@Body() payload: OrderDto, @Res() res: Response) {
    const order = await this.createOrderService.create(payload);

    return res.status(201).send(order);
  }

  @ApiOperation({
    summary: 'Atualização de ordem',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: OrderDto,
    @Res() res: Response,
  ) {
    await this.updateOrderService.update(id, payload);

    return res.status(200).send();
  }

  @ApiOperation({
    summary: 'Lista de ordem',
  })
  @Get()
  async list(@Res() res: Response) {
    const result = await this.listOrderService.list();

    return res.status(200).send(result);
  }

  @ApiOperation({
    summary: 'Obter ordem por id',
  })
  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.getByIdOrderService.getById(id);

    return res.status(200).send(result);
  }

  @ApiOperation({
    summary: 'Remove ordem por id',
  })
  @Delete(':id')
  async deleteById(@Param('id') id: string, @Res() res: Response) {
    await this.deleteOrderByIdService.deleteById(id);

    return res.status(204).send();
  }
}
