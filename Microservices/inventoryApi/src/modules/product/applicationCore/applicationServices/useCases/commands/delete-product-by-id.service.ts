import { Injectable, Logger } from '@nestjs/common';

import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';

@Injectable()
export class DeleteProductById {
  private readonly logger = new Logger(DeleteProductById.name);

  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async deleteById(id: string) {
    this.logger.verbose('Deleting Product');

    await this.productRepository.deleteById(id);
  }
}
