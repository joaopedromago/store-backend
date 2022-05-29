export class OrderProductDto {
  productId: string;
  name: string;
  type: string;
  amount: number;
}

export class OrderItemDto {
  description: string;
  quantity: number;
  product: OrderProductDto;
}

export class CustomerDto {
  name: string;
  document: string;
  email: string;
  phone: string;
}

export class AddressDto {
  state: string;
  street: string;
  address_line: string;
  city: string;
  zipCode: string;
}

export class PaymentStatusDto {
  paymentState: string;
  creditCardToken: string;
}

export class OrderAddressDto {
  state: string;
  street: string;
  address_line: string;
  city: string;
  zipCode: string;
}

export class OrderShipmentDto {
  shipmentInfo: string;
  shipmentState: string;
  currentAddress: OrderAddressDto;
}

export class OrderDto {
  items: OrderItemDto[];
  customer: CustomerDto;
  address: AddressDto;
  paymentStatus?: PaymentStatusDto;
  shipment?: OrderShipmentDto;
}
