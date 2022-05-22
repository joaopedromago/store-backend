import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

import { ProductRepositoryProvider } from 'src/infrastructure/adapters/repository/product.repository';
import {
  UpdateProduct,
  CreateProduct,
  ListProduct,
  GetByIdProduct,
  DeleteProductById,
} from 'src/modules/product/applicationCore/applicationServices/useCases';
import {
  ProductEntity,
  ProductEntitySchema,
} from 'src/modules/product/applicationCore/domain/product.entity';
import { ProductController } from 'src/modules/product/userInterface/restControllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductEntity.name,
        schema: ProductEntitySchema,
      },
    ]),
  ],
  providers: [
    ProductRepositoryProvider,
    UpdateProduct,
    CreateProduct,
    ListProduct,
    GetByIdProduct,
    DeleteProductById,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
