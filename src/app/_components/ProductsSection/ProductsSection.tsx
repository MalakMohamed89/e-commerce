import {  ProductType } from "@/Types/ProductsType/Products.type";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "@/Api/Services/product.service";

export default async function ProductsSection() {
  const allProducts = (await getAllProducts()) ?? [];

  return (
    <section className="mx-auto w-full max-w-384 px-4 pt-8 pb-8">
      <p className="mb-6 text-sm font-medium leading-5 text-gray-600">
        Showing {allProducts.length} products
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6">
          {allProducts.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
}
