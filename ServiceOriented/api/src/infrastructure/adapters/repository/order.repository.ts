import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import {
  OrderEntity,
  OrderEntityDocument,
} from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderRepositoryPort } from 'src/modules/order/applicationCore/ports/order.repository.port';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

@Injectable()
export class OrderRepositoryAdapter implements OrderRepositoryPort {
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly orderModel: Model<OrderEntityDocument>,
  ) {}

  async createOrder(order: OrderDto) {
    const orderEntity = new this.orderModel(order);
    const result = await orderEntity.save();
    return result;
  }

  async updateOrder(order: OrderEntityDocument) {
    order.isNew = false;
    await order.save();
  }

  async getOrderById(id: string): Promise<OrderEntityDocument | undefined> {
    const result = await this.orderModel.findById(new ObjectId(id));

    return result;
  }

  async deleteById(id: string): Promise<void> {
    await this.orderModel.deleteOne({ _id: new ObjectId(id) });
  }

  async listOrder(): Promise<OrderEntityDocument[]> {
    const result = await this.orderModel.find();

    return result;
  }
}

export const OrderRepositoryProvider: Provider<OrderRepositoryPort> = {
  provide: OrderRepositoryPort,
  useClass: OrderRepositoryAdapter,
};
