import { CartProductType } from "@/Types/CartType/CartType.type";
import { ProductType } from "@/Types/ProductsType/Products.type";

export function calcSale(product:ProductType| CartProductType["product"]): number | undefined {

  if(!product.priceAfterDiscount){
return
  }
  return Math.round(
    ((product.price - product.priceAfterDiscount) / product.price) * 100
  );

}