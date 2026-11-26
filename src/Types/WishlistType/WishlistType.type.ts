import type { ProductType } from "@/Types/ProductsType/Products.type";

export interface WishlistResponse {
  status: string;
  message?: string;
  count?: number;
  data: ProductType[];
}
