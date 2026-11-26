
"use client";

import Link from "next/link";
import { FolderOpen, ArrowRight } from "lucide-react";
import { SubCategoryType } from "@/Types/SubCategoriesType/SubCategories.type";


export default function SubCategoryCard({
  subCategory,
}: {subCategory:SubCategoryType}) {
  return (
    <Link
      href={`/subCategories/${subCategory._id}`}
      className="group flex min-h-60 flex-col rounded-[22px] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16a34a]/40 hover:shadow-xl"
    >
      {/* Icon */}
      <div className="mb-6 flex size-19 items-center justify-center rounded-2xl bg-[#f0fdf4] text-[#16a34a] transition-colors duration-300 group-hover:bg-[#dcfce7]">
        <FolderOpen size={34} fill="currentColor" strokeWidth={1.8} />
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold leading-relaxed text-[#0f172a] transition-colors duration-300 group-hover:text-[#16a34a]">
        {subCategory.name}
      </h3>

      {/* Browse Products */}
      <div className="mt-3 flex items-center gap-3 text-[#16a34a] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <span className="text-base font-medium">
          Browse Products
        </span>
        <ArrowRight size={19} />
      </div>
    </Link>
  );
}
