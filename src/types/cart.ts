import { Product, ProductVariant } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minSpend?: number;
}

export interface CartSummary {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  total: number;
  totalItems: number;
}
