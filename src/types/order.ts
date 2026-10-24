import { CartItem } from "./cart";
import { ShippingAddress } from "./user";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod = "cod" | "vnpay" | "momo" | "credit_card" | "banking";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  note?: string;
  createdAt: string;
  updatedAt?: string;
}
