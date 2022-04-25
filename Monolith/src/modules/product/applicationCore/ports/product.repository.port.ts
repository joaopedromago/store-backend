import { ProductEntity } from 'src/modules/product/applicationCore/domain/product.entity';
import { ProductDto } from 'src/modules/product/userInterface/dtos';

export abstract class ProductRepositoryPort {
  createProduct: (orderDto: ProductDto) => Promise<ProductEntity>;
  updateProduct: (orderDto: ProductEntity) => Promise<void>;
  deleteById: (id: string) => Promise<void>;

  getProductById: (id: string) => Promise<ProductEntity | undefined>;
  listProduct: () => Promise<ProductEntity[]>;
}
