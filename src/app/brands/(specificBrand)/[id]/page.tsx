import { notFound } from "next/navigation";
import Link from "next/link";
import { Tags } from 'lucide-react';
import { getSpecificBrand } from '@/Api/Services/brands.service';
import { getAllProducts } from '@/Api/Services/product.service';
import { ProductType } from '@/Types/ProductsType/Products.type';
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { PackageOpen, ArrowRight } from "lucide-react";

export default async function page(props:{params:Promise<{id:string}>}) {
 const params=await props.params
const id=params.id

const specificBrand=await getSpecificBrand(id)
if (!specificBrand) {
  notFound();
}
const products=await getAllProducts()
// console.log("subbbbbbbb",specificBrand)
const filteredProducts=products?.filter((product:ProductType)=>product.brand._id===id)

  return (
    <main className="flex-1">
      <section className="bg-[linear-gradient(152.39deg,#7f22fe_0%,#8e51ff_50%,#c27aff_100%)]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex h-5 items-center gap-2 text-sm font-medium leading-5">
            <Link href={"/"} className="text-white/70 hover:text-white duration-300 transition-all">Home</Link>
            <span className="text-white/40">/</span>
            <Link href={"/brands"} className="text-white/70 hover:text-white duration-300 transition-all">Brands</Link>
             <span className="text-white/40">/</span>
            <span className="text-white">{specificBrand.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur">
              <Tags aria-hidden="true" className="size-9.5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold leading-9 tracking-[-0.75px] text-white md:text-4xl md:leading-10">
                {specificBrand.name} Brand
              </h1>
              <p className="text-base font-medium leading-6 text-white/80">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>


{filteredProducts?.length > 0 ? (
  <div className="mx-auto py-10 grid w-full max-w-384 grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
    {filteredProducts.map((product: ProductType) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
) : (

<section className="mx-auto flex min-h-100 w-full max-w-384 flex-col items-center justify-center px-4 py-16 text-center">
  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-50">
    <Tags className="h-12 w-12 text-purple-600" strokeWidth={1.5} />
  </div>

  <h2 className="mb-3 text-2xl font-bold text-gray-900">
    No Products Available
  </h2>

  <p className="mb-7 max-w-md text-sm leading-6 text-gray-500">
    This brand doesn't have any products available at the moment.
    Explore other brands and discover products you'll love!
  </p>

  <Link
    href="/brands"
    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700"
  >
    Explore Brands
    <ArrowRight className="h-4 w-4" />
  </Link>
</section>

)}

    </main>
  );
}
