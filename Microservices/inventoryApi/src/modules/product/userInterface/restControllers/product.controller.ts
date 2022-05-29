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
  UpdateProduct,
  CreateProduct,
  ListProduct,
  GetByIdProduct,
  DeleteProductById,
} from 'src/modules/product/applicationCore/applicationServices/useCases';
import {
  ProductDto,
  UpdateProductDto,
} from 'src/modules/product/userInterface/dtos';

@ApiTags('Produto')
@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProduct,
    private readonly updateProductService: UpdateProduct,
    private readonly listProductService: ListProduct,
    private readonly getByIdProductService: GetByIdProduct,
    private readonly deleteProductByIdService: DeleteProductById,
  ) {}

  @ApiOperation({
    summary: 'Criação de produto',
  })
  @Post()
  async create(@Body() payload: ProductDto, @Res() res: Response) {
    const product = await this.createProductService.create(payload);

    return res.status(201).send(product);
  }

  @ApiOperation({
    summary: 'Atualização de produto',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
    @Res() res: Response,
  ) {
    await this.updateProductService.update(id, payload);

    return res.status(200).send();
  }

  @ApiOperation({
    summary: 'Lista de produto',
  })
  @Get()
  async list(@Res() res: Response) {
    const result = await this.listProductService.list();

    return res.status(200).send(result);
  }

  @ApiOperation({
    summary: 'Obter produto por id',
  })
  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.getByIdProductService.getById(id);

    return res.status(200).send(result);
  }

  @ApiOperation({
    summary: 'Remove produto por id',
  })
  @Delete(':id')
  async deleteById(@Param('id') id: string, @Res() res: Response) {
    await this.deleteProductByIdService.deleteById(id);

    return res.status(204).send();
  }
}
