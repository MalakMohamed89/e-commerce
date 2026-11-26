export type OrderProduct = {
  _id?: string;
  title?: string;
  imageCover?: string;
  price?: number;
};

export type OrderItem = {
  _id?: string;
  count?: number;
  price?: number;
  product?: OrderProduct;
};

export type OrderType = {
  _id: string;
  id?: number;
  createdAt?: string;
  cartItems?: OrderItem[];
  totalOrderPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  paymentMethodType?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  status?: string;
  shippingAddress?: {
    city?: string;
    details?: string;
    phone?: string;
  };
};

export type ProductCardOrdersProps = {
  order: OrderType;
  defaultExpanded?: boolean;
};