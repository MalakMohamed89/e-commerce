import { LayoutGrid } from "lucide-react";
import CategoriesSection from "@/app/_components/CategoriesSection/CategoriesSection";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <main className="flex-1">
      <section className="bg-[linear-gradient(149.69deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)] md:bg-[linear-gradient(172.87deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex h-5 items-center gap-2 text-sm font-medium leading-5">
            <Link href={"/"} className="text-white/70 hover:text-white duration-300 transition-all">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Categories</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative flex h-16 w-[54.59px] shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur md:w-16">
              <LayoutGrid aria-hidden="true" className="h-7.5 w-[37.5px] text-white" strokeWidth={2} />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="text-3xl font-bold leading-9 tracking-[-0.75px] text-white md:text-4xl md:leading-10 md:tracking-[-0.9px]">
                All Categories
              </h1>
              <p className="text-base font-medium leading-6 text-white/80">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection />
    </main>
  );
}
