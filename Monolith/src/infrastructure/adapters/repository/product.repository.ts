import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import {
  ProductEntity,
  ProductEntityDocument,
} from 'src/modules/product/applicationCore/domain/product.entity';
import { ProductRepositoryPort } from 'src/modules/product/applicationCore/ports/product.repository.port';
import { ProductDto } from 'src/modules/product/userInterface/dtos';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPort {
  constructor(
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductEntityDocument>,
  ) {}

  async createProduct(product: ProductDto) {
    const productEntity = new this.productModel(product);
    const result = await productEntity.save();
    return result;
  }

  async updateProduct(product: ProductEntityDocument) {
    product.isNew = false;
    await product.save();
  }

  async getProductById(id: string): Promise<ProductEntityDocument | undefined> {
    const result = await this.productModel.findById(new ObjectId(id));

    return result;
  }

  async deleteById(id: string): Promise<void> {
    await this.productModel.deleteOne({ _id: new ObjectId(id) });
  }

  async listProduct(): Promise<ProductEntityDocument[]> {
    const result = await this.productModel.find();

    return result;
  }
}

export const ProductRepositoryProvider: Provider<ProductRepositoryPort> = {
  provide: ProductRepositoryPort,
  useClass: ProductRepositoryAdapter,
};
