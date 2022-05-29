import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';
import { UpdateProductDto } from 'src/modules/product/userInterface/dtos';

@Injectable()
export class UpdateProduct {
  private readonly logger = new Logger(UpdateProduct.name);

  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async update(id: string, product: UpdateProductDto) {
    this.logger.verbose('Updating Product');

    const productEntity = await this.productRepository.getProductById(id);

    if (!productEntity) {
      throw new NotFoundException('Product Not Found');
    }

    productEntity.updateValues(product);

    await this.productRepository.updateProduct(productEntity);
  }
}
