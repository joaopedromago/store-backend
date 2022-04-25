import { OrderEntity } from 'src/modules/order/applicationCore/domain/order.entity';
import { OrderDto } from 'src/modules/order/userInterface/dtos';

export abstract class OrderRepositoryPort {
  createOrder: (orderDto: OrderDto) => Promise<OrderEntity>;
  updateOrder: (orderDto: OrderEntity) => Promise<void>;
  deleteById: (id: string) => Promise<void>;

  getOrderById: (id: string) => Promise<OrderEntity | undefined>;
  listOrder: () => Promise<OrderEntity[]>;
}
