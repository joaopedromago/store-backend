import { Prop, Schema } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { OrderDto } from 'src/modules/order/userInterface/dtos';
import { PaymentStatusDto } from 'src/modules/payment/userInterface/dtos';
import { ShipmentDto } from 'src/modules/shipment/userInterface/dtos';
import { SchemaFactoryWithMethods } from 'src/shared/utils/schema-factory-with-methods';

export class OrderProductEntity {
  @Prop()
  productId: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  amount: number;
}

export class OrderItemEntity {
  @Prop()
  description: string;

  @Prop()
  quantity: number;

  @Prop()
  product: OrderProductEntity;
}

export class CustomerEntity {
  @Prop()
  name: string;

  @Prop()
  document: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;
}

export class AddressEntity {
  @Prop()
  state: string;

  @Prop()
  street: string;

  @Prop()
  address_line: string;

  @Prop()
  city: string;

  @Prop()
  zipCode: string;
}

export class PaymentStatusEntity {
  constructor(paymentStatus?: PaymentStatusDto) {
    if (paymentStatus) {
      this.paymentState = paymentStatus.paymentState;
      this.creditCardToken = paymentStatus.creditCardToken;
    }
  }

  @Prop()
  paymentState: string;

  @Prop()
  creditCardToken: string;
}

export class CurrentAddressEntity {
  @Prop()
  state: string;

  @Prop()
  street: string;

  @Prop()
  address_line: string;

  @Prop()
  city: string;

  @Prop()
  zipCode: string;
}

export class ShipmentEntity {
  constructor(shipment: ShipmentDto) {
    this.shipmentInfo = shipment.shipmentInfo;
    this.shipmentState = shipment.shipmentState;
    this.currentAddress = shipment.currentAddress;
  }

  @Prop()
  shipmentInfo: string;

  @Prop()
  shipmentState: string;

  @Prop()
  currentAddress: CurrentAddressEntity;
}

@Schema({ collection: 'Order' })
export class OrderEntity {
  @Prop()
  items: OrderItemEntity[];

  @Prop()
  customer: CustomerEntity;

  @Prop()
  address: AddressEntity;

  @Prop()
  paymentStatus?: PaymentStatusEntity;

  @Prop()
  shipment?: ShipmentEntity;

  updateValues(orderDto: OrderDto) {
    this.items = orderDto.items;
    this.customer = orderDto.customer;
    this.address = orderDto.address;
  }

  updatePayment(paymentStatus: PaymentStatusDto) {
    this.paymentStatus = new PaymentStatusEntity(paymentStatus);
  }

  updateShipment(shipment: ShipmentDto) {
    this.shipment = new ShipmentEntity(shipment);
  }
}

export type OrderEntityDocument = OrderEntity & Document;

export const OrderEntitySchema =
  SchemaFactoryWithMethods.createForClass(OrderEntity);
