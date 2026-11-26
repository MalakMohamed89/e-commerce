import { Tags } from "lucide-react";
import BrandCard from "@/app/_components/BrandCard/BrandCard";
import { getAllBrands } from "@/Api/Services/brands.service";
import { BrandType } from "@/Types/BrandsType/Brands.type";
import Link from "next/link";

export default async function BrandsPage() {

const brands: BrandType[]=await getAllBrands()


  return (
    <main className="flex-1">
      <section className="bg-[linear-gradient(152.39deg,#7f22fe_0%,#8e51ff_50%,#c27aff_100%)]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex h-5 items-center gap-2 text-sm font-medium leading-5">
            <Link href={"/"}  className="text-white/70 cursor-pointer hover:text-white transition-all du">Home</Link >
            <span className="text-white/40">/</span>
            <span className="text-white">Brands</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur">
              <Tags aria-hidden="true" className="size-9.5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold leading-9 tracking-[-0.75px] text-white md:text-4xl md:leading-10">
                Top Brands
              </h1>
              <p className="text-base font-medium leading-6 text-white/80">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Featured brand" className="mx-auto mt-10 w-full max-w-384 px-4 pb-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </section>
    </main>
  );
}
