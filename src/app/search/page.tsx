import { getAllProducts } from "@/Api/Services/product.service";
import { getAllCategories } from "@/Api/Services/category.service";
import { getAllBrands } from "@/Api/Services/brands.service";
import type { ProductType, Category } from "@/Types/ProductsType/Products.type";
import type { BrandType } from "@/Types/BrandsType/Brands.type";
import SearchResults from "@/app/_components/SearchResults/SearchResults";

type SearchParams = Promise<{ q?: string | string[] }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const [{ q }, products, categories, brands] = await Promise.all([
    searchParams,
    getAllProducts(),
    getAllCategories(),
    getAllBrands(),
  ]);

  const initialQuery = Array.isArray(q) ? q[0] ?? "" : q ?? "";

  return (
    <SearchResults
      products={(products ?? []) as ProductType[]}
      categories={(categories ?? []) as Category[]}
      brands={(brands ?? []) as BrandType[]}
      initialQuery={initialQuery}
    />
  );
}
