import { Injectable, Logger } from '@nestjs/common';

import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';

@Injectable()
export class GetByIdProduct {
  private readonly logger = new Logger(GetByIdProduct.name);

  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async getById(id: string) {
    this.logger.verbose('Getting Product');

    return this.productRepository.getProductById(id);
  }
}
