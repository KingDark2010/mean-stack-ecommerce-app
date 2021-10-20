// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product, User } from "@ntig9/products";

export interface Order {
  _id: string;
  orderItems: OrderItems[];
  shippingAddress1: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  shippingPhone: boolean;
  shipmentStatus: boolean;
  paymentStatus: boolean;
  totalPrice: number;
  user: User;
  dateOfOrder: Date;
}

export interface OrderObject {
  data: Order;
}

export interface OrdersObject {
  data: Order[];
}

export interface OrderItems {
  quantity: number;
  product: Product;
}
