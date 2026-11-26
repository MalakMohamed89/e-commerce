import { notFound } from "next/navigation";
import Link from "next/link";
import { FolderOpen, Filter, X, Package } from "lucide-react";

import { getSpecificCategory } from "@/Api/Services/category.service";
import Image from "next/image";

import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { ProductType } from "@/Types/ProductsType/Products.type";
import { getAllProducts } from "@/Api/Services/product.service";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;


const category=await  getSpecificCategory(id)
const allProducts=await getAllProducts()

  if (!category) notFound();


  const products: ProductType[] = (allProducts ?? []).filter(
    (product: ProductType) => product.category?._id === id
  );

  return (
    <main className="flex-1 bg-[#f8fafc]">
      {/* Header */}
      <section className="bg-[linear-gradient(149.69deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)] md:bg-[linear-gradient(172.87deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium">
            <Link href="/" className="text-white/70 transition-all duration-300 hover:text-white">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/categories" className="text-white/70 transition-all duration-300 hover:text-white">
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="truncate text-white">{category.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur">
             <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="64px"
                className="object-cover p-2"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="text-3xl font-bold leading-9 tracking-[-0.75px] text-white md:text-4xl md:leading-10">
                {category.name}
              </h1>
              <p className="text-sm text-white/80">Browse {category.name} products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto min-h-125 w-full max-w-384 px-4 py-10 md:py-12">
        {/* Active Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-2 text-gray-700">
            <Filter className="size-4" />
            Active Filters:
          </span>

          <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 font-medium text-green-700">
            <FolderOpen className="size-4" />
            {category.name}
            <Link href="/categories" aria-label="Remove filter">
              <X className="size-3.5" />
            </Link>
          </span>

          <Link href="/categories" className="text-gray-600 underline hover:text-green-600">
            Clear all
          </Link>
        </div>

        <p className="mb-6 text-sm text-gray-500">Showing {products.length} products</p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-75 flex-col items-center justify-center text-center">
            <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-gray-100">
              <Package className="size-9 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">No Products Found</h3>
            <p className="mb-5 text-sm text-gray-500">No products match your current filters.</p>
            <Link
              href="/categories"
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              View All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}