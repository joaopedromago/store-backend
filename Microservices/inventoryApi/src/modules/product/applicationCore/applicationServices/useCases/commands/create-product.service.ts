import { Injectable, Logger } from '@nestjs/common';

import { ProductEntity } from 'src/modules/product/applicationCore/domain/product.entity';
import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';
import { ProductDto } from 'src/modules/product/userInterface/dtos';

@Injectable()
export class CreateProduct {
  private readonly logger = new Logger(CreateProduct.name);

  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async create(product: ProductDto): Promise<ProductEntity> {
    this.logger.verbose('Creating Product');

    const result = await this.productRepository.createProduct(product);

    return result;
  }
}
