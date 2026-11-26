
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { getSpecificCategory } from "@/Api/Services/category.service";
import { getAllSubCategoriesOnCategory } from "@/Api/Services/subcategories.service";

import SubCategoryCard from "@/app/_components/SubCategoryCard/SubCategoryCard";
import { SubCategoryType } from "@/Types/SubCategoriesType/SubCategories.type";

import { ArrowLeft } from "lucide-react";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const subCategories = await getAllSubCategoriesOnCategory(id);
  const specificCategory = await getSpecificCategory(id);

  if (!specificCategory) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#f8fafc]">

      {/* Category Header */}
      <section className="bg-[linear-gradient(149.69deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)] md:bg-[linear-gradient(172.87deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Link
              href="/"
              className="text-white/70 transition-all duration-300 hover:text-white"
            >
              Home
            </Link>

            <span className="text-white/40">/</span>

            <Link
              href="/categories"
              className="text-white/70 transition-all duration-300 hover:text-white"
            >
              Categories
            </Link>

            <span className="text-white/40">/</span>

            <span className="truncate text-white">
              {specificCategory.name}
            </span>
          </nav>

          <div className="flex items-center gap-5">

            {/* Category Image */}
            <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-white/20 shadow-lg backdrop-blur">
              <Image
                src={specificCategory.image}
                alt={specificCategory.name}
                fill
                sizes="64px"
                className="object-cover p-2"
              />
            </div>

            {/* Category Info */}
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="text-3xl font-bold leading-9 tracking-[-0.75px] text-white md:text-4xl md:leading-10">
                {specificCategory.name}
              </h1>

            </div>

          </div>
        </div>
      </section>

      {/* Subcategories Section */}
      <section className="mx-auto min-h-125 w-full max-w-384 px-4 py-10 md:py-12">

        {/* Section Heading */}
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-[#0f172a] md:text-2xl">
            {subCategories.length} Subcategories in {specificCategory.name}
          </h2>

          <p className="text-sm text-gray-500 md:text-base">
            Explore our subcategories and find exactly what you are looking for.
          </p>
        </div>

        {/* Subcategories Grid */}
        {subCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {subCategories.map((subCategory: SubCategoryType) => (
              <SubCategoryCard
                key={subCategory._id}
                subCategory={subCategory}
              />
            ))}

          </div>
        ) : (
          <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-4 text-center">

            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-green-50">
              <ArrowLeft className="size-7 text-green-600" />
            </div>

            <h3 className="mb-2 text-lg font-bold text-gray-900">
              No Subcategories Found
            </h3>

            <p className="max-w-sm text-sm leading-6 text-gray-500">
              There are no subcategories available in this category right now.
            </p>

            <Link
              href="/categories"
              className="mt-5 text-sm font-semibold text-green-600 transition-colors hover:text-green-700"
            >
              Browse Other Categories
            </Link>

          </div>
        )}

      </section>

    </main>
  );
}
