import { Injectable, Logger } from '@nestjs/common';

import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';

@Injectable()
export class ListProduct {
  private readonly logger = new Logger(ListProduct.name);

  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async list() {
    this.logger.verbose('Listing Product');

    return this.productRepository.listProduct();
  }
}
